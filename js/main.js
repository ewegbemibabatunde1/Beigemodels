/**
 * BEIGE MODEL MANAGEMENT — MAIN CONTROLLER
 * Orchestrates navigation, scroll reveals, pointer interactions, and WhatsApp.
 */

import { initShortlist } from './shortlist.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Shortlist State
  initShortlist();

  // 2. Mobile Navigation Drawer
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

  // 3. Scroll Reveal Observer
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

  // 4. Pointer-based 3D Tilt & Cursor Glow (Fine pointers only, respecting reduced motion)
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
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

  // 5. Hero Scroll Cue Interaction
  const heroNext = document.getElementById('heroNext');
  if (heroNext) {
    heroNext.addEventListener('click', () => {
      const talentSection = document.getElementById('models');
      if (talentSection) {
        talentSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 6. WhatsApp Business Link Configuration
  // Configurable verified agency number (format: country code without +, e.g. 2348000000000)
  // For development, placeholder is set to official inquiry channel or configured securely
  const agencyWhatsAppNumber = '2348030000000'; // Configurable verified business destination
  const whatsappFloat = document.getElementById('whatsappFloat');

  if (whatsappFloat) {
    const prefilledText = encodeURIComponent('Hello Beige Model Management, I would like to enquire about booking talent for an upcoming campaign.');
    whatsappFloat.href = `https://wa.me/${agencyWhatsAppNumber}?text=${prefilledText}`;
  }

  // 7. Active Navigation Link on Scroll
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

  // 8. Dynamic Copyright Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
