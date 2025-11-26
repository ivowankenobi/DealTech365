const fs = require('fs');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

// Configuration
const POSTS_DIR = path.join(__dirname, '../blog/posts');
const TEMPLATE_PATH = path.join(__dirname, '../blog/templates/post-template.html');
const OUTPUT_DIR = path.join(__dirname, '../blog');
const INDEX_OUTPUT = path.join(__dirname, '../blog/index.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read template
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Get all MD files
const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
const posts = [];

console.log(`🚀 Starting blog generation... Found ${files.length} posts.`);

files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse front-matter
    const { attributes, body } = frontMatter(fileContent);

    // Convert MD to HTML
    const htmlContent = marked.parse(body);

    // Create slug from filename
    const slug = file.replace('.md', '');
    const outputFilename = `${slug}.html`;

    // Inject into template
    let finalHtml = template
        .replace(/{{title}}/g, attributes.title || 'Untitled')
        .replace(/{{date}}/g, attributes.date || new Date().toLocaleDateString())
        .replace(/{{author}}/g, attributes.author || 'DealTech365')
        .replace(/{{image}}/g, attributes.image || '../images/default-blog.jpg')
        .replace(/{{description}}/g, attributes.description || '')
        .replace(/{{content}}/g, htmlContent);

    // Write HTML file
    fs.writeFileSync(path.join(OUTPUT_DIR, outputFilename), finalHtml);
    console.log(`✅ Generated: ${outputFilename}`);

    // Add to index
    posts.push({
        title: attributes.title,
        date: attributes.date,
        image: attributes.image,
        description: attributes.description,
        link: `blog/${outputFilename}`, // Relative to root
        tags: attributes.tags || []
    });
});

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write index.json
fs.writeFileSync(INDEX_OUTPUT, JSON.stringify(posts, null, 2));
console.log(`📊 Index generated with ${posts.length} posts.`);
console.log('✨ Blog generation complete!');
