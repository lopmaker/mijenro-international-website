(() => {
  const TRANSLATIONS = {
    en: {
      "lang.label": "Language",
      "menu.open": "Menu",
      "menu.close": "Close",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.capabilities": "Capabilities",
      "nav.manufacturing": "Manufacturing",
      "nav.sustainability": "Sustainability",
      "nav.contact": "Contact",
      "header.cta": "Start Partnership",
      "footer.company": "Company",
      "footer.partnership": "Partnership",
      "footer.contact": "Contact",
      "footer.tagline": "General Company Introduction Website"
    },
    es: {
      "lang.label": "Idioma",
      "menu.open": "Menú",
      "menu.close": "Cerrar",
      "nav.home": "Inicio",
      "nav.about": "Nosotros",
      "nav.capabilities": "Capacidades",
      "nav.manufacturing": "Manufactura",
      "nav.sustainability": "Sostenibilidad",
      "nav.contact": "Contacto",
      "header.cta": "Iniciar Alianza",
      "footer.company": "Empresa",
      "footer.partnership": "Alianza",
      "footer.contact": "Contacto",
      "footer.tagline": "Sitio web de presentación corporativa"
    },
    "zh-CN": {
      "lang.label": "语言",
      "menu.open": "菜单",
      "menu.close": "关闭",
      "nav.home": "首页",
      "nav.about": "关于我们",
      "nav.capabilities": "能力",
      "nav.manufacturing": "生产制造",
      "nav.sustainability": "可持续发展",
      "nav.contact": "联系我们",
      "header.cta": "开始合作",
      "footer.company": "公司",
      "footer.partnership": "合作",
      "footer.contact": "联系",
      "footer.tagline": "企业介绍官网"
    },
    "zh-TW": {
      "lang.label": "語言",
      "menu.open": "選單",
      "menu.close": "關閉",
      "nav.home": "首頁",
      "nav.about": "關於我們",
      "nav.capabilities": "能力",
      "nav.manufacturing": "生產製造",
      "nav.sustainability": "永續發展",
      "nav.contact": "聯絡我們",
      "header.cta": "開始合作",
      "footer.company": "公司",
      "footer.partnership": "合作",
      "footer.contact": "聯絡",
      "footer.tagline": "企業介紹官方網站"
    }
  };

  const FALLBACK_LANG = "en";
  const STORAGE_KEY = "mijenro_lang";

  const normalizeLang = (lang) => {
    if (!lang) return FALLBACK_LANG;
    if (TRANSLATIONS[lang]) return lang;
    const lower = lang.toLowerCase();
    if (lower.startsWith("zh-cn") || lower === "zh") return "zh-CN";
    if (lower.startsWith("zh-tw") || lower.startsWith("zh-hk")) return "zh-TW";
    if (lower.startsWith("es")) return "es";
    return FALLBACK_LANG;
  };

  let currentLang = normalizeLang(localStorage.getItem(STORAGE_KEY) || navigator.language);

  const t = (key) => TRANSLATIONS[currentLang][key] || TRANSLATIONS[FALLBACK_LANG][key] || key;

  const applyTranslations = () => {
    document.documentElement.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    const langSelect = document.getElementById("lang-select");
    if (langSelect) langSelect.value = currentLang;

    const toggle = document.querySelector(".mobile-toggle");
    if (toggle) {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.textContent = expanded ? t("menu.close") : t("menu.open");
    }
  };

  window.I18N = {
    t,
    getLang: () => currentLang,
    setLang: (lang) => {
      currentLang = normalizeLang(lang);
      localStorage.setItem(STORAGE_KEY, currentLang);
      applyTranslations();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => window.I18N.setLang(e.target.value));
    }

    applyTranslations();
  });
})();
