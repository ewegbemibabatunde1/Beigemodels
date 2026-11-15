/**
 * BEIGE MODEL MANAGEMENT — EDITORIAL MOTION & VISUAL POLISH
 * Handles IntersectionObserver reveals, fixed header backdrop transitions,
 * smooth cursor ambient glow, button micro-interactions, and copyright year.
 */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal on scroll
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // 2. Header Scroll Backdrop
  function initHeaderScroll() {
    var header = document.querySelector('.site-header') || document.querySelector('.profile-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 3. Desktop Ambient Cursor Glow
  function initCursorGlow() {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    var glow = document.querySelector('.cursor-glow');
    if (!glow) {
      glow = document.createElement('div');
      glow.className = 'cursor-glow';
      document.body.appendChild(glow);
    }
    window.addEventListener('pointermove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  // 4. Footer Current Year
  function initYear() {
    var year = document.getElementById('currentYear');
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  // 5. Back to Top Smooth Cue (optional click on brand to smooth scroll if on homepage)
  function initBrandClick() {
    var brand = document.querySelector('.site-header .brand');
    if (brand && window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/')) {
      brand.addEventListener('click', function (e) {
        if (window.location.hash || window.scrollY > 100) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }

  // Initialize
  function initMotion() {
    initReveal();
    initHeaderScroll();
    initCursorGlow();
    initYear();
    initBrandClick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();
