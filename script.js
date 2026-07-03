// script.js

// Mark JS availability so reveal-on-scroll styles only hide content when they can un-hide it
document.documentElement.classList.add('js');

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

    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

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

  if (toggleButton && siteNav) {
    const setOpen = (open) => {
      toggleButton.setAttribute('aria-expanded', open);
      siteNav.classList.toggle('open', open);
      toggleButton.textContent = open ? 'Close' : 'Menu';
    };
    toggleButton.addEventListener('click', () => {
      setOpen(toggleButton.getAttribute('aria-expanded') !== 'true');
    });
    // Close the dropdown when a nav link is tapped
    siteNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
  }
});

// --- Scroll Reveal (staggered, per design) ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const sibs = el.parentElement
          ? Array.prototype.filter.call(el.parentElement.children, (c) => c.hasAttribute('data-reveal'))
          : [];
        const delay = Math.max(0, sibs.indexOf(el)) * 0.09;
        el.style.transition =
          'opacity .7s cubic-bezier(.2,.7,.2,1) ' + delay + 's, transform .7s cubic-bezier(.2,.7,.2,1) ' + delay + 's';
        el.classList.add('revealed');
      });
    }, { threshold: 0.12 });
    io.observe(el);
  });
});

// --- Services selector (services.html) ---
document.addEventListener('DOMContentLoaded', () => {
  const names = document.querySelectorAll('.svc-name');
  const panels = document.querySelectorAll('.svc-panel');
  const ghostNum = document.getElementById('svc-ghost-num');
  if (!names.length || !panels.length) return;

  names.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-svc');
      names.forEach((b) => b.classList.toggle('active', b === btn));
      panels.forEach((p) => p.classList.toggle('active', p.getAttribute('data-svc') === idx));
      if (ghostNum) ghostNum.textContent = '0' + (parseInt(idx, 10) + 1);
    });
  });
});

// --- FAQ accordion (contact.html) ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const toggle = item.querySelector('.faq-toggle');
    const icon = item.querySelector('.faq-icon');
    if (!toggle) return;
    const flip = () => {
      const open = item.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      if (icon) icon.textContent = open ? '−' : '+';
    };
    toggle.addEventListener('click', flip);
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });
});
