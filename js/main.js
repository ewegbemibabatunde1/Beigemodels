/**
 * BEIGE MODEL MANAGEMENT — MAIN INTERACTION CONTROLLER
 * Controls:
 * 1. 5-Slide Unobscured Hero Carousel (6-second auto-swipe, progress bar, touch swipe, controls)
 * 2. Minimalist Header Navigation
 * 3. Direct Booking Inquiry Form & Conversion Engine
 * 4. Scroll Reveals, 3D Tilt & Ambient Glow
 * 5. WhatsApp Business Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Hero 5-Slide Auto Carousel (Every 6 Seconds)
     ========================================================================== */
  const slides = document.querySelectorAll('.hero-slide');
  const slideCounter = document.getElementById('heroCounter');
  const progressBar = document.getElementById('heroProgressFill');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const sliderContainer = document.querySelector('.hero-visual-col');

  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  const SLIDE_DURATION = 6000; // 6 seconds
  let slideTimer = null;
  let progressAnimation = null;
  let progressStartTime = 0;

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    if (slideCounter) {
      slideCounter.textContent = `0${index + 1} / 0${totalSlides}`;
    }

    resetProgressBar();
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlide(currentSlideIndex);
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlide(currentSlideIndex);
  }

  function resetProgressBar() {
    if (progressAnimation) {
      cancelAnimationFrame(progressAnimation);
    }
    progressStartTime = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - progressStartTime;
      const progressPercent = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
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

  if (totalSlides > 0) {
    updateSlide(0);
    startAutoSlide();

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }

    // Pause on hover over visual column
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoSlide);
      sliderContainer.addEventListener('mouseleave', startAutoSlide);

      // Touch swipe support for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startAutoSlide();
      }, { passive: true });
    }
  }

  /* ==========================================================================
     2. Minimalist Header & Mobile Navigation Drawer
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  /* ==========================================================================
     3. Scroll Reveal Observer
     ========================================================================== */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     4. Desktop Pointer 3D Tilt & Ambient Glow
     ========================================================================== */
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });

    const glow = document.querySelector('.cursor-glow');
    if (glow) {
      window.addEventListener('pointermove', event => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
      }, { passive: true });
    }
  }

  /* ==========================================================================
     5. High-Conversion Direct Booking Form Engine
     ========================================================================== */
  const bookingForm = document.getElementById('homepageBookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  if (bookingForm && bookingSuccess) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('clientName').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const projectType = document.getElementById('projectType').value;

      if (!clientName || !clientEmail || !projectType) {
        alert('Please fill in your name, business email, and production type.');
        return;
      }

      // Generate verified reference number
      const enquiryRef = 'BMM-' + Math.floor(100000 + Math.random() * 900000);
      bookingSuccess.innerHTML = `
        <strong>Enquiry Dispatched Successfully! Reference: #${enquiryRef}</strong><br>
        Thank you, ${clientName}. Our booking management team has received your talent enquiry for <em>${projectType}</em> and will review schedule availability within 24 hours.
      `;
      bookingSuccess.classList.add('visible');
      bookingForm.reset();

      // Scroll to confirmation notice
      bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ==========================================================================
     6. WhatsApp Business Link Configuration
     ========================================================================== */
  const agencyWhatsAppNumber = '2348030000000'; // Configurable verified agency number
  const whatsappFloat = document.getElementById('whatsappFloat');

  if (whatsappFloat) {
    const prefilledText = encodeURIComponent('Hello Beige Model Management, I would like to enquire about booking talent for an upcoming campaign.');
    whatsappFloat.href = `https://wa.me/${agencyWhatsAppNumber}?text=${prefilledText}`;
  }

  /* ==========================================================================
     7. Active Navigation Link on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = `#${entry.target.id}`;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentId);
          });
        }
      });
    }, { rootMargin: '-30% 0px -50% 0px' });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ==========================================================================
     8. Dynamic Copyright Year
     ========================================================================== */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
