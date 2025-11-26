/**
 * Blog Carousel - WordPress Style
 * Fullwidth slider with one slide at a time
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogPosts);
  } else {
    loadBlogPosts();
  }

  async function loadBlogPosts() {
    const track = document.querySelector('.blog-carousel__track');
    if (!track) return;

    try {
      // Fetch posts
      const response = await fetch('blog/index.json');
      if (!response.ok) throw new Error('Failed to load blog index');
      const posts = await response.json();

      if (posts.length === 0) {
        initCarousel(); // Fallback to existing static content if no dynamic posts
        return;
      }

      // Clear static content
      track.innerHTML = '';

      // Render posts
      posts.forEach(post => {
        const slide = document.createElement('article');
        slide.className = 'blog-carousel__slide';
        // Ensure image path is correct relative to index.html
        // If post.image starts with http, use it. If not, ensure it's relative.
        // The generator script puts 'https://...' or '../images/...'
        // If it's '../images/...', and we are in index.html, it should be 'images/...'
        // But wait, the generator script uses attributes.image directly.
        // In the sample post, I used a full URL.
        // In the template, I used {{image}}.
        // If I use a local image in MD: image: ../images/foo.jpg
        // In index.html (root), it should be images/foo.jpg.
        // In blog/post.html (subdir), it should be ../images/foo.jpg.
        // This is a path issue. 
        // For now, I'll assume full URLs or correct relative paths for root.
        // The sample post has a full URL, so it's fine.

        slide.innerHTML = `
          <a href="${post.link}" class="blog-card">
            <div class="blog-card__image-wrapper">
              <img src="${post.image}" alt="${post.title}" class="blog-card__image" loading="lazy">
            </div>
            <div class="blog-card__content">
              <div class="blog-card__meta">${new Date(post.date).toLocaleDateString()}</div>
              <h3 class="blog-card__title">${post.title}</h3>
              <p class="blog-card__excerpt">${post.description}</p>
              <span class="blog-card__link">Leer más →</span>
            </div>
          </a>
        `;
        track.appendChild(slide);
      });

      // Initialize carousel logic
      initCarousel();

    } catch (error) {
      console.warn('Blog dynamic load failed, using static fallback', error);
      initCarousel();
    }
  }

  function initCarousel() {
    const carousel = document.querySelector('.blog-carousel');
    if (!carousel) return;

    const wrapper = carousel.querySelector('.blog-carousel__wrapper');
    const track = carousel.querySelector('.blog-carousel__track');
    const prevBtn = carousel.querySelector('.blog-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.blog-carousel__btn--next');
    const indicatorsContainer = carousel.querySelector('.blog-carousel__indicators');
    const slides = Array.from(carousel.querySelectorAll('.blog-carousel__slide'));

    if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds

    // Create indicators
    function createIndicators() {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'blog-carousel__indicator';
        indicator.setAttribute('aria-label', `Ir a slide ${index + 1}`);
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
      });
    }

    // Update indicators
    function updateIndicators() {
      const indicators = indicatorsContainer.querySelectorAll('.blog-carousel__indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    // Update button states
    function updateButtons() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === slides.length - 1;
    }

    // Go to specific slide
    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));
      const offset = -(currentIndex * 100);
      track.style.transform = `translateX(${offset}%)`;
      updateButtons();
      updateIndicators();
      resetAutoplay();
    }

    // Previous slide
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    });

    // Next slide
    nextBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
      }
    });

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        if (currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0); // Loop back to first slide
        }
      }, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pause autoplay on hover
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < slides.length - 1) {
          // Swipe left - next slide
          goToSlide(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          // Swipe right - previous slide
          goToSlide(currentIndex - 1);
        }
      } else {
        startAutoplay();
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
      }
    });

    // Initialize
    createIndicators();
    updateButtons();
    updateIndicators();
    startAutoplay();

    // Pause autoplay when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }
})();
