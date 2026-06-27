/**
 * main.js
 * Main orchestration file for the portfolio website.
 * Initializes preloader, navigation, smooth scrolling,
 * and coordinates all other modules.
 */

(function () {
  'use strict';

  // ─── Preloader ─────────────────────────────────────────────
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      // Fade out over 500ms
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
      }, 500);
    });
  }

  // ─── Navigation ────────────────────────────────────────────
  function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // --- Navbar scroll state ---
    const handleNavScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run once on init

    // --- Active link highlighting ---
    const highlightActiveLink = () => {
      const scrollY = window.scrollY;
      const navHeight = navbar ? navbar.offsetHeight : 70;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', highlightActiveLink, { passive: true });
    highlightActiveLink(); // Run once on init

    // --- Mobile menu toggle ---
    if (navToggle) {
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('nav-open');
      });
    }

    // --- Close mobile menu when a link is clicked ---
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
      });
    });

    // --- Close mobile menu when clicking outside ---
    document.addEventListener('click', (e) => {
      if (!document.body.classList.contains('nav-open')) return;

      const navMenu = document.querySelector('.nav-links');
      if (
        navMenu &&
        !navMenu.contains(e.target) &&
        navToggle &&
        !navToggle.contains(e.target)
      ) {
        document.body.classList.remove('nav-open');
      }
    });
  }

  // ─── Smooth Scroll ─────────────────────────────────────────
  function initSmoothScroll() {
    const NAV_OFFSET = 70; // Fixed navbar height offset

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        const targetTop = targetElement.offsetTop - NAV_OFFSET;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      });
    });
  }

  // ─── Current Year ──────────────────────────────────────────
  function initCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ─── DOM Ready ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader (listens for window load internally)
    initPreloader();

    // 2. Navigation & smooth scroll
    initNavigation();
    initSmoothScroll();

    // 3. Three.js particle background
    if (typeof window.initParticles === 'function') {
      window.initParticles();
    }

    // 4. Scroll & hover animations
    if (typeof window.initAnimations === 'function') {
      window.initAnimations();
    }

    // 5. Contact form
    if (typeof window.initContactForm === 'function') {
      window.initContactForm();
    }

    // 6. Footer year
    initCurrentYear();
  });
})();
