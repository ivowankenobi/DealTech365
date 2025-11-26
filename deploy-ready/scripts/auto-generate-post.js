const fs = require('fs');
const path = require('path');
const dealsData = require('../js/deals.js');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../blog/posts');
const DEALS = dealsData.generateDeals({ isEurope: true, currency: 'EUR', currencySymbol: '€' });

// Templates
const TEMPLATES = {
    single: (deal) => `---
title: "¡Chollo! ${deal.name} con ${deal.discount}% de descuento"
date: "${new Date().toISOString().split('T')[0]}"
author: "DealTech365 Bot"
image: "${deal.image}"
description: "Aprovecha esta oferta increíble en ${deal.brand}. Precio mínimo histórico por tiempo limitado."
tags: ['oferta', '${deal.category}', '${deal.brand.toLowerCase()}']
---

# ¡Oportunidad Única! ${deal.name}

Si estabas buscando **${deal.name}**, hoy es tu día de suerte. Hemos detectado una bajada de precio brutal en Amazon.

## 📉 Análisis de Precio
*   **Precio Original:** ${deal.currencySymbol}${deal.basePrice}
*   **Precio Oferta:** **${deal.currencySymbol}${deal.finalPrice}**
*   **Ahorro Total:** ${deal.currencySymbol}${deal.savings} (${deal.discount}%)

![${deal.name}](${deal.image})

## 🚀 Características Destacadas
${Object.entries(deal.specs || {}).map(([key, value]) => `*   **${key}:** ${value}`).join('\n')}

## ¿Por qué comprarlo?
Este producto de **${deal.brand}** destaca por su relación calidad-precio. Con este descuento del ${deal.discount}%, se convierte en una compra maestra.

[👉 VER OFERTA EN AMAZON](${deal.affiliateLink})
`,

    comparison: (category, deals) => `---
title: "Comparativa: Los ${deals.length} Mejores ${deals[0].categoryName} de 2025"
date: "${new Date().toISOString().split('T')[0]}"
author: "DealTech365 Expertos"
image: "${deals[0].image}"
description: "Analizamos y comparamos las mejores ofertas en ${deals[0].categoryName}. Descubre cuál se adapta mejor a ti."
tags: ['comparativa', '${category}', 'guía']
---

# Los Mejores ${deals[0].categoryName} en Oferta

Hemos seleccionado las mejores opciones de **${deals[0].categoryName}** disponibles ahora mismo con descuento. Aquí tienes nuestra comparativa definitiva.

## 🏆 Tabla Comparativa

| Producto | Precio | Descuento | Lo mejor |
| :--- | :--- | :--- | :--- |
${deals.map(d => `| ${d.brand} ${d.name.substring(0, 20)}... | **${d.currencySymbol}${d.finalPrice}** | -${d.discount}% | ${Object.values(d.specs || {})[0] || 'Calidad'} |`).join('\n')}

## Análisis Detallado

${deals.map(d => `
### ${d.name}
![${d.name}](${d.image})

*   **Precio:** ${d.currencySymbol}${d.finalPrice} (Antes ${d.currencySymbol}${d.basePrice})
*   **Ahorro:** ${d.discount}%

**Nuestra opinión:** Una opción sólida si buscas ${d.brand}.

[👉 Ver Precio Actual](${d.affiliateLink})
`).join('\n---\n')}

## Conclusión
Si buscas la mejor relación calidad-precio, te recomendamos el **${deals[0].name}**.
`,

    topList: (category, deals) => `---
title: "Top 5 ${deals[0].categoryName} por menos de ${deals[0].currencySymbol}500"
date: "${new Date().toISOString().split('T')[0]}"
author: "DealTech365"
image: "${deals[0].image}"
description: "Selección de los mejores ${deals[0].categoryName} económicos que puedes comprar hoy."
tags: ['top', '${category}', 'barato']
---

# Top 5 ${deals[0].categoryName} Económicos

No hace falta gastar una fortuna para tener buena tecnología. Aquí tienes nuestro Top 5 de ofertas.

${deals.map((d, i) => `
## ${i + 1}. ${d.name}
> **Descuento del ${d.discount}%**

![${d.name}](${d.image})

Este modelo de **${d.brand}** es perfecto para quienes buscan rendimiento sin pagar de más.

*   **Precio Oferta:** **${d.currencySymbol}${d.finalPrice}**
*   [👉 Comprar en Amazon](${d.affiliateLink})
`).join('\n\n')}
`
};

// Logic
function generatePost() {
    const args = process.argv.slice(2);
    const type = args[0] || 'single'; // single, comparison, top

    console.log(`🤖 Generando post tipo: ${type}...`);

    if (type === 'single') {
        // Find high discount deal
        const bestDeals = DEALS.filter(d => d.discount >= 30);
        const randomDeal = bestDeals[Math.floor(Math.random() * bestDeals.length)];

        if (!randomDeal) {
            console.error('No se encontraron ofertas con suficiente descuento.');
            return;
        }

        const content = TEMPLATES.single(randomDeal);
        const filename = `oferta-${randomDeal.brand}-${randomDeal.asin}.md`.toLowerCase().replace(/[^a-z0-9-.]/g, '-');

        fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
        console.log(`✅ Post generado: ${filename}`);
    }

    else if (type === 'comparison') {
        // Pick a random category
        const categories = Object.keys(dealsData.DEAL_CATEGORIES);
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        const catDeals = DEALS.filter(d => d.category === randomCat).slice(0, 3);

        if (catDeals.length < 2) {
            console.error('No hay suficientes productos para comparar.');
            return;
        }

        const content = TEMPLATES.comparison(randomCat, catDeals);
        const filename = `comparativa-${randomCat}-${new Date().getTime()}.md`;

        fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
        console.log(`✅ Comparativa generada: ${filename}`);
    }

    else if (type === 'top') {
        // Pick a random category
        const categories = Object.keys(dealsData.DEAL_CATEGORIES);
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        const catDeals = DEALS.filter(d => d.category === randomCat).sort((a, b) => a.finalPrice - b.finalPrice).slice(0, 5);

        const content = TEMPLATES.topList(randomCat, catDeals);
        const filename = `top-5-${randomCat}-${new Date().getTime()}.md`;

        fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
        console.log(`✅ Top List generado: ${filename}`);
    }
}

generatePost();
