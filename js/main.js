/**
 * BEIGE MODEL MANAGEMENT — MAIN INTERACTION CONTROLLER
 * Accessible, reduced-motion-aware interactions and WhatsApp hand-off.
 */
(function () {
  'use strict';

  const SLIDE_DURATION = 6000;
  let currentSlideIndex = 0;
  let slideTimer = null;
  let progressAnimation = null;
  let progressStartTime = 0;
  let totalSlides = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const counter = document.getElementById('heroCounter');
    totalSlides = slides.length;
    if (!totalSlides) return;
    currentSlideIndex = (index + totalSlides) % totalSlides;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlideIndex));
    if (counter) counter.textContent = String(currentSlideIndex + 1).padStart(2, '0') + ' / ' + String(totalSlides).padStart(2, '0');
    resetProgressBar();
  }

  function resetProgressBar() {
    const bar = document.getElementById('heroProgressFill');
    if (progressAnimation) cancelAnimationFrame(progressAnimation);
    if (!bar) return;
    if (reducedMotion) { bar.style.width = '0%'; return; }
    progressStartTime = performance.now();
    function step(timestamp) {
      const pct = Math.min(((timestamp - progressStartTime) / SLIDE_DURATION) * 100, 100);
      bar.style.width = pct + '%';
      if (pct < 100) progressAnimation = requestAnimationFrame(step);
    }
    progressAnimation = requestAnimationFrame(step);
  }

  function stopAutoSlide() {
    if (slideTimer) window.clearInterval(slideTimer);
    slideTimer = null;
    if (progressAnimation) cancelAnimationFrame(progressAnimation);
    progressAnimation = null;
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (reducedMotion || totalSlides < 2) return;
    resetProgressBar();
    slideTimer = window.setInterval(() => updateSlide(currentSlideIndex + 1), SLIDE_DURATION);
  }

  function getWhatsAppUrl(message) {
    const number = (window.BEIGE_CONFIG && window.BEIGE_CONFIG.whatsappNumber || '').replace(/\D/g, '');
    if (!number) return null;
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  function showStatus(element, message, isError) {
    if (!element) return;
    element.textContent = message;
    element.classList.add('visible');
    element.classList.toggle('is-error', Boolean(isError));
  }

  window.beigeNextSlide = function () {
    updateSlide(currentSlideIndex + 1);
    startAutoSlide();
  };

  window.beigePrevSlide = function () {
    updateSlide(currentSlideIndex - 1);
    startAutoSlide();
  };

  function initCarousel() {
    totalSlides = document.querySelectorAll('.hero-slide').length;
    if (!totalSlides) return;
    updateSlide(0);
    startAutoSlide();
    const next = document.getElementById('heroNextBtn');
    const prev = document.getElementById('heroPrevBtn');
    if (next) next.addEventListener('click', (e) => { e.preventDefault(); window.beigeNextSlide(); });
    if (prev) prev.addEventListener('click', (e) => { e.preventDefault(); window.beigePrevSlide(); });
    const hero = document.getElementById('home');
    if (hero) {
      hero.addEventListener('mouseenter', stopAutoSlide);
      hero.addEventListener('mouseleave', startAutoSlide);
      hero.addEventListener('focusin', stopAutoSlide);
      hero.addEventListener('focusout', startAutoSlide);
      let startX = 0;
      hero.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, { passive: true });
      hero.addEventListener('touchend', e => {
        const delta = e.changedTouches[0].screenX - startX;
        if (Math.abs(delta) > 48) { updateSlide(currentSlideIndex + (delta < 0 ? 1 : -1)); startAutoSlide(); }
      }, { passive: true });
    }
    document.addEventListener('visibilitychange', () => document.hidden ? stopAutoSlide() : startAutoSlide());
  }

  function initNavigation() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    function closeMenu() {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open mobile navigation menu');
      toggle.textContent = '☰';
    }
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close mobile navigation menu' : 'Open mobile navigation menu');
      toggle.textContent = open ? '✕' : '☰';
      if (open) { const firstLink = nav.querySelector('a'); if (firstLink) firstLink.focus(); }
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal:not(.visible)');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => observer.observe(el));
  }

  function initPointerEffects() {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (x * 2.5) + 'deg) rotateX(' + (-y * 2.5) + 'deg)';
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
    const glow = document.querySelector('.cursor-glow');
    if (glow) window.addEventListener('pointermove', event => { glow.style.left = event.clientX + 'px'; glow.style.top = event.clientY + 'px'; }, { passive: true });
  }

  function initWhatsAppLinks() {
    const float = document.getElementById('whatsappFloat');
    const number = (window.BEIGE_CONFIG && window.BEIGE_CONFIG.whatsappNumber || '').replace(/\D/g, '');
    if (float) {
      const url = getWhatsAppUrl('Hello Beige Model Management, I would like to enquire about booking talent for an upcoming campaign.');
      if (url) { float.href = url; float.hidden = false; }
      else { float.hidden = true; }
    }
    document.querySelectorAll('[data-whatsapp-purpose="model-application"]').forEach(link => {
      const url = getWhatsAppUrl('Hello Beige Model Management, I am interested in applying to be considered for model representation. Please let me know your application requirements.');
      if (url) link.href = url;
      else { link.href = '#contact'; link.addEventListener('click', e => { e.preventDefault(); alert('The agency WhatsApp number has not been configured yet. Please contact the agency directly.'); }); }
    });
  }

  function initBookingForm() {
    const form = document.getElementById('homepageBookingForm');
    const status = document.getElementById('bookingSuccess');
    if (!form || !status) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = {
        name: document.getElementById('clientName').value.trim(),
        email: document.getElementById('clientEmail').value.trim(),
        production: document.getElementById('projectType').value,
        dates: document.getElementById('shootDates').value.trim(),
        talent: document.getElementById('requestedModel').value.trim(),
        brief: document.getElementById('projectBrief').value.trim()
      };
      const message = [
        'BEIGE MODEL MANAGEMENT — BOOKING ENQUIRY',
        '', 'Name / Company: ' + data.name, 'Business email: ' + data.email,
        'Production type: ' + data.production, 'Requested timeline: ' + (data.dates || 'Not specified'),
        'Preferred model(s): ' + (data.talent || 'Agency recommendation requested'),
        'Project brief: ' + (data.brief || 'To be discussed')
      ].join('\n');
      const url = getWhatsAppUrl(message);
      if (!url) {
        showStatus(status, 'WhatsApp booking is not configured yet. Add the verified agency number in js/site-config.js before accepting enquiries. No enquiry has been sent.', true);
        return;
      }
      const popup = window.open(url, '_blank');
      if (popup) popup.opener = null;
      if (!popup) {
        showStatus(status, 'Your browser blocked the WhatsApp window. Please allow pop-ups or use the WhatsApp contact link.', true);
        return;
      }
      showStatus(status, 'Your booking brief has been prepared in WhatsApp. Please press Send in WhatsApp to deliver it to Beige Model Management.', false);
    });
  }

  function initYear() {
    const year = document.getElementById('currentYear');
    if (year) year.textContent = new Date().getFullYear();
  }

  function initApp() {
    initCarousel();
    initNavigation();
    initReveal();
    initPointerEffects();
    initWhatsAppLinks();
    initBookingForm();
    initYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApp);
  else initApp();
})();
