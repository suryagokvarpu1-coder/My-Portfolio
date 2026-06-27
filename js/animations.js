/**
 * animations.js
 * Scroll-triggered animation system using IntersectionObserver.
 * Includes: scroll reveals, text character animation, counter animation,
 * parallax scrolling, and magnetic hover effects.
 */

(function () {
  'use strict';

  // ─── Scroll Reveal Animations ──────────────────────────────
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate once only
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ─── Text Reveal (Character-by-Character) ──────────────────
  function initTextReveal() {
    const elements = document.querySelectorAll('.text-reveal');
    if (!elements.length) return;

    elements.forEach((el) => {
      const text = el.textContent;
      el.textContent = ''; // Clear original text
      el.setAttribute('aria-label', text); // Accessibility

      // Wrap each character in a span
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        span.style.transitionDelay = `${index * 40}ms`;
        el.appendChild(span);
      });
    });

    // Observe for reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    document.querySelectorAll('.text-reveal').forEach((el) => observer.observe(el));
  }

  // ─── Counter Animation ─────────────────────────────────────
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    /**
     * Easing function: easeOutQuad
     * @param {number} t - Progress (0 to 1)
     * @returns {number}
     */
    const easeOutQuad = (t) => t * (2 - t);

    /**
     * Format number with comma separators
     * @param {number} num
     * @returns {string}
     */
    const formatNumber = (num) => {
      if (num > 999) {
        return num.toLocaleString('en-US');
      }
      return num.toString();
    };

    /**
     * Animate a single counter from 0 to target
     * @param {HTMLElement} el
     */
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1500; // ms
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentValue = Math.floor(easedProgress * target);

        el.textContent = formatNumber(currentValue) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          // Ensure final value is exact
          el.textContent = formatNumber(target) + suffix;
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    counters.forEach((el) => observer.observe(el));
  }

  // ─── Parallax Scrolling ────────────────────────────────────
  function initParallax() {
    const elements = document.querySelectorAll('.parallax');
    if (!elements.length) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
        const yOffset = scrollY * speed;
        el.style.transform = `translateY(${yOffset}px)`;
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── Magnetic Hover Effect ─────────────────────────────────
  function initMagneticHover() {
    const elements = document.querySelectorAll('.magnetic');
    if (!elements.length) return;

    elements.forEach((el) => {
      let animFrame = null;

      el.addEventListener('mousemove', (e) => {
        if (animFrame) cancelAnimationFrame(animFrame);

        animFrame = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Calculate offset from center, clamped to ±10px
          const maxOffset = 10;
          const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * maxOffset;
          const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * maxOffset;

          el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          el.style.transition = 'transform 0.15s ease-out';
        });
      });

      el.addEventListener('mouseleave', () => {
        if (animFrame) cancelAnimationFrame(animFrame);

        // Smoothly return to origin
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.4s ease-out';
      });
    });
  }

  // ─── Master Init ───────────────────────────────────────────
  function initAnimations() {
    initScrollAnimations();
    initTextReveal();
    initCounterAnimation();
    initParallax();
    initMagneticHover();
  }

  // Expose globally for main.js
  window.initAnimations = initAnimations;
})();
