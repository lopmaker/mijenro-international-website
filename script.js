// script.js

// --- i18n Configuration ---
let currentLang = localStorage.getItem('mijenro_lang') || 'en';
let translations = {};

async function loadLanguage(lang) {
  try {
    // Use embedded I18N_DATA (from i18n-data.js) if available, otherwise try fetch
    if (typeof I18N_DATA !== 'undefined' && I18N_DATA[lang]) {
      translations = I18N_DATA[lang];
    } else {
      const response = await fetch(`locales/${lang}.json`);
      translations = await response.json();
    }
    applyTranslations();
    document.body.classList.remove('loading-i18n');
    document.body.classList.add('i18n-ready');

    // Update active state on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Find button matching this lang
    const activeBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b =>
      b.getAttribute('onclick')?.includes(`'${lang}'`)
    );
    if (activeBtn) activeBtn.classList.add('active');

  } catch (error) {
    console.error('Error loading language file:', error);
    document.body.classList.remove('loading-i18n'); // Failsafe
  }
}

function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const path = element.getAttribute('data-i18n');
    const keys = path.split('.');
    let value = translations;

    // Traverse the nested JSON
    for (const key of keys) {
      if (value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }

    if (value) {
      const targetAttr = element.getAttribute('data-i18n-attr');
      if (targetAttr) {
        element.setAttribute(targetAttr, value);
      } else {
        element.textContent = value;
      }
    }
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('mijenro_lang', lang);
  loadLanguage(lang);
}

// Initialize i18n
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(currentLang);
});


// --- Dynamic Footer Year ---
document.addEventListener('DOMContentLoaded', () => {
  const yearSpans = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
});

// --- Mobile Navigation Toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.mobile-toggle');
  const siteNav = document.getElementById('site-nav');

  if (!toggleButton || !siteNav) return;

  const closeMenu = () => {
    toggleButton.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
    document.body.style.overflow = '';
    toggleButton.textContent = 'Menu';
  };

  const openMenu = () => {
    toggleButton.setAttribute('aria-expanded', 'true');
    siteNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleButton.textContent = 'Close';
  };

  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) closeMenu(); else openMenu();
  });

  // Close menu when a nav link is activated (mobile UX)
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleButton.getAttribute('aria-expanded') === 'true') closeMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggleButton.focus();
    }
  });
});

// --- Contact Form: Async submit via /api/contact ---
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (stateClass, messageKey, fallback) => {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.classList.remove('is-sending', 'is-success', 'is-error');
    statusEl.classList.add(stateClass);
    const fromI18n = translations?.formStatus?.[messageKey];
    statusEl.textContent = fromI18n || fallback;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    if (submitBtn) submitBtn.disabled = true;
    setStatus('is-sending', 'sending', 'Sending your inquiry…');

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await resp.json().catch(() => ({}));
      if (resp.ok && payload.ok) {
        setStatus('is-success', 'success',
          'Thanks — your inquiry was sent. We’ll reply within 24 hours.');
        form.reset();
      } else {
        setStatus('is-error', 'error',
          payload.error || 'Something went wrong. Please try again or email contact@mijenro.com.');
      }
    } catch (err) {
      console.error('Contact form submit failed:', err);
      setStatus('is-error', 'error',
        'Something went wrong. Please try again or email contact@mijenro.com.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

// --- Sticky Header Effect ---
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');

  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
  }
});

// --- Scroll Reveal Animations ---
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});


