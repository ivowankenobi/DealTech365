/**
 * Blog Carousel with i18n Support
 * Loads blog posts dynamically based on current language
 */

(function () {
  'use strict';

  // Wait for DOM and i18n to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Load blog posts immediately
    loadBlogPosts();

    // Re-render on language change
    window.addEventListener('languageChanged', () => {
      console.log('Language changed, reloading blog posts...');
      loadBlogPosts();
    });
  }

  async function loadBlogPosts() {
    const track = document.querySelector('.blog-carousel__track');
    if (!track) {
      console.warn('Blog carousel track not found');
      return;
    }

    try {
      // Get current language
      const currentLang = localStorage.getItem('language') || 'es';
      console.log('Loading blog posts for language:', currentLang);

      // Fetch blog posts data
      const response = await fetch('data/blog-posts.json');
      if (!response.ok) throw new Error('Failed to load blog posts');

      const data = await response.json();
      const posts = data.posts;

      if (posts.length === 0) {
        console.warn('No blog posts found');
        return;
      }

      console.log(`Rendering ${posts.length} blog posts in ${currentLang}`);

      // Clear existing content
      track.innerHTML = '';

      // Render posts with current language
      posts.forEach(post => {
        const slide = document.createElement('a');
        slide.href = post.url;
        slide.className = 'blog-carousel__slide';

        slide.innerHTML = `
          <img src="${post.image}" alt="${post.imageAlt[currentLang] || post.imageAlt.es}">
          <div class="blog-carousel__overlay">
            <div class="blog-carousel__content">
              <span class="blog-carousel__category">${post.category[currentLang] || post.category.es}</span>
              <h2>${post.title[currentLang] || post.title.es}</h2>
              <p>${post.description[currentLang] || post.description.es}</p>
              <span class="blog-carousel__cta">${post.cta[currentLang] || post.cta.es}</span>
            </div>
          </div>
        `;

        track.appendChild(slide);
      });

      console.log('Blog posts rendered successfully');

      // Initialize carousel if it exists in blog-carousel.js
      if (typeof initCarousel === 'function') {
        console.log('Reinitializing carousel...');
        initCarousel();
      } else {
        console.warn('initCarousel function not found');
      }

    } catch (error) {
      console.warn('Blog carousel i18n load failed:', error);
      // Fallback: keep static HTML content
    }
  }
})();
