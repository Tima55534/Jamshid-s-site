// =========================================================
// FIN PLUS — JAVASCRIPT
// =========================================================

(function () {
  'use strict';

  /* ---------- Header scroll effect ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ---------- Intersection Observer (scroll animations) ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Smooth anchor for back-to-top ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Add data-animate attributes to sections ---------- */
  const addAnimations = () => {
    // Hero elements
    const heroElements = document.querySelectorAll(
      '.hero__badge, .hero__title, .hero__subtitle, .hero__offer-card, .hero__actions, .hero__stats'
    );
    heroElements.forEach((el, i) => {
      el.setAttribute('data-animate', '');
      el.setAttribute('data-animate-delay', Math.min(i + 1, 6));
    });

    // Pain cards
    document.querySelectorAll('.pain__card').forEach((el, i) => {
      el.setAttribute('data-animate', '');
      el.setAttribute('data-animate-delay', Math.min(i + 1, 6));
    });
    const painCta = document.querySelector('.pain__cta');
    if (painCta) painCta.setAttribute('data-animate', '');

    // Service cards
    document.querySelectorAll('.service-card').forEach((el, i) => {
      el.setAttribute('data-animate', '');
      el.setAttribute('data-animate-delay', Math.min(i + 1, 6));
    });

    // Team cards
    document.querySelectorAll('.team-card').forEach((el, i) => {
      el.setAttribute('data-animate', '');
      el.setAttribute('data-animate-delay', Math.min(i + 1, 6));
    });

    // Contact cards
    document.querySelectorAll('.contact-card').forEach((el, i) => {
      el.setAttribute('data-animate', '');
      el.setAttribute('data-animate-delay', i + 1);
    });

    // Section headings
    document.querySelectorAll('.section-badge, .section-title, .section-subtitle, .audit__banner').forEach(el => {
      if (!el.hasAttribute('data-animate')) el.setAttribute('data-animate', '');
    });
  };

  addAnimations();

  // Re-run observer for newly annotated elements
  if ('IntersectionObserver' in window) {
    const allAnimated = document.querySelectorAll('[data-animate]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    allAnimated.forEach(el => {
      if (!el.classList.contains('visible')) obs.observe(el);
    });
  }

  /* ---------- Stat counter animation ---------- */
  const stats = document.querySelectorAll('.hero__stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    stats.forEach(stat => {
      const text = stat.textContent.trim();
      if (text === '98%') {
        let current = 0;
        const target = 98;
        const step = () => {
          current += 2;
          stat.textContent = current + '%';
          if (current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  };

  const heroStatSection = document.querySelector('.hero__stats');
  if (heroStatSection && 'IntersectionObserver' in window) {
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateStats, 400);
          statObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statObs.observe(heroStatSection);
  }

})();
