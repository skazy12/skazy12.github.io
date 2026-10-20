(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll('[data-language]');
  const translatable = document.querySelectorAll('[data-es][data-en]');
  const ariaTranslatable = document.querySelectorAll('[data-es-aria][data-en-aria]');
  const altTranslatable = document.querySelectorAll('[data-es-alt][data-en-alt]');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');

  const setLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'es';
    root.lang = lang;
    root.dataset.lang = lang;
    translatable.forEach((element) => {
      element.textContent = element.dataset[lang];
    });
    ariaTranslatable.forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`${lang}Aria`]);
    });
    altTranslatable.forEach((element) => {
      element.alt = element.dataset[`${lang}Alt`];
    });
    languageButtons.forEach((button) => {
      const active = button.dataset.language === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.title = lang === 'es'
      ? 'Omar Rodríguez — Ingeniero de Software y Datos'
      : 'Omar Rodríguez — Software & Data Engineer';
    try { localStorage.setItem('portfolio-language', lang); } catch (_) { /* Storage can be disabled. */ }
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('is-open', !open);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  }, { passive: true });

  document.querySelectorAll('.hero .reveal').forEach((element) => element.classList.add('is-visible'));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  let storedLanguage;
  try { storedLanguage = localStorage.getItem('portfolio-language'); } catch (_) { storedLanguage = null; }
  setLanguage(storedLanguage || 'es');
  document.getElementById('current-year').textContent = new Date().getFullYear();
})();
