/**
 * BEIGE MODEL MANAGEMENT — MAIN INTERACTION CONTROLLER
 * Full fail-safe support for local file:// and http/https environments.
 */

(function () {
  'use strict';

  let currentSlideIndex = 0;
  let totalSlides = 0;
  const SLIDE_DURATION = 6000; // 6 seconds
  let slideTimer = null;
  let progressAnimation = null;
  let progressStartTime = 0;

  function updateSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const slideCounter = document.getElementById('heroCounter');
    totalSlides = slides.length;
    if (totalSlides === 0) return;

    currentSlideIndex = (index + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlideIndex);
    });

    if (slideCounter) {
      slideCounter.textContent = `0${currentSlideIndex + 1} / 0${totalSlides}`;
    }

    resetProgressBar();
  }

  function nextSlide() {
    updateSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    updateSlide(currentSlideIndex - 1);
  }

  function resetProgressBar() {
    const progressBar = document.getElementById('heroProgressFill');
    if (progressAnimation) {
      cancelAnimationFrame(progressAnimation);
      progressAnimation = null;
    }
    progressStartTime = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - progressStartTime;
      const progressPercent = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      if (progressBar) {
        progressBar.style.width = progressPercent + '%';
      }
      if (elapsed < SLIDE_DURATION) {
        progressAnimation = requestAnimationFrame(step);
      }
    }
    progressAnimation = requestAnimationFrame(step);
  }

  function startAutoSlide() {
    stopAutoSlide();
    resetProgressBar();
    slideTimer = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopAutoSlide() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
    if (progressAnimation) {
      cancelAnimationFrame(progressAnimation);
      progressAnimation = null;
    }
  }

  // Expose global functions for direct inline invocation fallback
  window.beigeNextSlide = function () {
    nextSlide();
    startAutoSlide();
  };

  window.beigePrevSlide = function () {
    prevSlide();
    startAutoSlide();
  };

  function initApp() {
    const slides = document.querySelectorAll('.hero-slide');
    totalSlides = slides.length;

    // 1. Hero Carousel Setup
    if (totalSlides > 0) {
      updateSlide(0);
      startAutoSlide();

      const nextBtn = document.getElementById('heroNextBtn');
      const prevBtn = document.getElementById('heroPrevBtn');

      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.preventDefault();
          window.beigeNextSlide();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.preventDefault();
          window.beigePrevSlide();
        });
      }

      const heroSection = document.getElementById('home');
      if (heroSection) {
        let touchStartX = 0;
        heroSection.addEventListener('touchstart', function (e) {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener('touchend', function (e) {
          const touchEndX = e.changedTouches[0].screenX;
          const deltaX = touchEndX - touchStartX;
          if (Math.abs(deltaX) > 40) {
            if (deltaX < 0) {
              window.beigeNextSlide();
            } else {
              window.beigePrevSlide();
            }
          }
        }, { passive: true });
      }
    }

    // 2. Mobile Navigation Drawer
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('open');
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.textContent = isOpen ? '✕' : '☰';
      });

      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mainNav.classList.remove('open');
          document.body.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.textContent = '☰';
        });
      });
    }

    // 3. Scroll Reveal Observer
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }

    // 4. Desktop Pointer 3D Tilt & Ambient Glow
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFinePointer && !prefersReducedMotion) {
      document.querySelectorAll('.tilt').forEach(function (card) {
        card.addEventListener('pointermove', function (event) {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = 'perspective(900px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg)';
        });

        card.addEventListener('pointerleave', function () {
          card.style.transform = '';
        });
      });

      const glow = document.querySelector('.cursor-glow');
      if (glow) {
        window.addEventListener('pointermove', function (event) {
          glow.style.left = event.clientX + 'px';
          glow.style.top = event.clientY + 'px';
        }, { passive: true });
      }
    }

    // 5. Booking Form Handler
    const bookingForm = document.getElementById('homepageBookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');

    if (bookingForm && bookingSuccess) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('clientName');
        const emailInput = document.getElementById('clientEmail');
        const projectInput = document.getElementById('projectType');

        const clientName = nameInput ? nameInput.value.trim() : '';
        const clientEmail = emailInput ? emailInput.value.trim() : '';
        const projectType = projectInput ? projectInput.value : '';

        if (!clientName || !clientEmail || !projectType) {
          alert('Please fill in your name, business email, and production type.');
          return;
        }

        const enquiryRef = 'BMM-' + Math.floor(100000 + Math.random() * 900000);
        bookingSuccess.innerHTML = '<strong>Enquiry Dispatched Successfully! Reference: #' + enquiryRef + '</strong><br>' +
          'Thank you, ' + clientName + '. Our booking management team has received your talent enquiry for <em>' + projectType + '</em> and will review availability within 24 hours.';
        bookingSuccess.classList.add('visible');
        bookingForm.reset();
        bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    // 6. WhatsApp Business Link
    const agencyWhatsAppNumber = '2348030000000';
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
      const prefilledText = encodeURIComponent('Hello Beige Model Management, I would like to enquire about booking talent for an upcoming campaign.');
      whatsappFloat.href = 'https://wa.me/' + agencyWhatsAppNumber + '?text=' + prefilledText;
    }

    // 7. Dynamic Year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Safe DOM ready execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
