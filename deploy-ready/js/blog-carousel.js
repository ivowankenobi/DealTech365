/**
 * Blog Carousel - WordPress Style
 * Fullwidth slider with one slide at a time
 */

(function () {
  'use strict';

  // Expose initCarousel globally for blog-carousel-i18n.js to call
  window.initCarousel = initCarousel;

  // Initialize carousel when DOM is ready (only if slides exist)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Wait a bit for blog-carousel-i18n.js to load posts first
      setTimeout(() => {
        const slides = document.querySelectorAll('.blog-carousel__slide');
        if (slides.length > 0) {
          initCarousel();
        }
      }, 100);
    });
  } else {
    setTimeout(() => {
      const slides = document.querySelectorAll('.blog-carousel__slide');
      if (slides.length > 0) {
        initCarousel();
      }
    }, 100);
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
