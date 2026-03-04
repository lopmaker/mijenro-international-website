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

  const TEXT_TRANSLATIONS = {
    es: {
      "Global Wholesale Programs": "Programas Mayoristas Globales",
      "Build Stronger Apparel Partnerships With Mijenro International": "Construya alianzas textiles más sólidas con Mijenro International",
      "Mijenro International supports growing brands and retail buyers with dependable garment sourcing, quality manufacturing, and compliant export operations. We are structured for long-term wholesale partnerships.": "Mijenro International apoya a marcas en crecimiento y compradores minoristas con abastecimiento confiable, manufactura de calidad y operaciones de exportación conformes. Estamos estructurados para alianzas mayoristas a largo plazo.",
      "Request Company Profile": "Solicitar Perfil Corporativo",
      "Explore Capabilities": "Explorar Capacidades",
      "OEM & ODM": "OEM y ODM",
      "Private Label Programs": "Programas de Marca Privada",
      "Ethical Manufacturing": "Manufactura Ética",
      "Global Export Readiness": "Preparación para Exportación Global",
      "Years of export experience": "Años de experiencia en exportación",
      "Annual unit capacity": "Capacidad anual de unidades",
      "Countries served": "Países atendidos",
      "Partner Network": "Red de Socios",
      "Trusted by Regional Retailers and Brand Operators": "Con la confianza de minoristas regionales y operadores de marca",
      "Core Services": "Servicios Principales",
      "What Mijenro Delivers for Wholesale Buyers": "Lo que Mijenro ofrece a compradores mayoristas",
      "Compliance + Process": "Cumplimiento + Proceso",
      "Looking for a Long-Term Garment Wholesale Partner?": "¿Busca un socio mayorista textil a largo plazo?",
      "Send Inquiry": "Enviar Consulta",
      "About Mijenro": "Sobre Mijenro",
      "A Garment Wholesale Company Built for Reliable Partnership": "Una empresa mayorista textil construida para alianzas confiables",
      "Company Story": "Historia de la Empresa",
      "Our Values": "Nuestros Valores",
      "Capabilities": "Capacidades",
      "Complete Program Support for Garment Wholesale Growth": "Soporte integral para el crecimiento mayorista textil",
      "Program Services": "Servicios del Programa",
      "Product Scope": "Alcance de Productos",
      "How We Work": "Cómo Trabajamos",
      "Simple Partnership Structure": "Estructura de Alianza Simple",
      "Factory & Process": "Fábrica y Proceso",
      "Manufacturing Systems Designed for Quality and Scale": "Sistemas de fabricación diseñados para calidad y escala",
      "Production Flow": "Flujo de Producción",
      "Capacity Snapshot": "Resumen de Capacidad",
      "Quality Discipline": "Disciplina de Calidad",
      "Sustainability & Compliance": "Sostenibilidad y Cumplimiento",
      "Responsible Production Practices for Global Wholesale Buyers": "Prácticas de producción responsables para compradores mayoristas globales",
      "Compliance Areas": "Áreas de Cumplimiento",
      "Certifications & Audits": "Certificaciones y Auditorías",
      "Contact": "Contacto",
      "Let’s Discuss Your Garment Wholesale Requirements": "Hablemos de sus necesidades mayoristas de prendas",
      "Partnership Inquiry Form": "Formulario de Consulta de Alianza",
      "FAQ": "Preguntas Frecuentes"
    },
    "zh-CN": {
      "Global Wholesale Programs": "全球批发项目",
      "Build Stronger Apparel Partnerships With Mijenro International": "与 Mijenro International 建立更强的服装合作关系",
      "Mijenro International supports growing brands and retail buyers with dependable garment sourcing, quality manufacturing, and compliant export operations. We are structured for long-term wholesale partnerships.": "Mijenro International 为成长型品牌和零售买家提供可靠的服装采购、优质制造与合规出口运营。我们专为长期批发合作而打造。",
      "Request Company Profile": "索取公司资料",
      "Explore Capabilities": "查看能力",
      "OEM & ODM": "OEM 与 ODM",
      "Private Label Programs": "自有品牌项目",
      "Ethical Manufacturing": "合规制造",
      "Global Export Readiness": "全球出口就绪",
      "Years of export experience": "出口经验年数",
      "Annual unit capacity": "年产能",
      "Countries served": "服务国家",
      "Partner Network": "合作网络",
      "Trusted by Regional Retailers and Brand Operators": "受区域零售商与品牌方信赖",
      "Core Services": "核心服务",
      "What Mijenro Delivers for Wholesale Buyers": "Mijenro 为批发买家提供什么",
      "Compliance + Process": "合规 + 流程",
      "Looking for a Long-Term Garment Wholesale Partner?": "正在寻找长期服装批发合作伙伴？",
      "Send Inquiry": "发送咨询",
      "About Mijenro": "关于 Mijenro",
      "A Garment Wholesale Company Built for Reliable Partnership": "一家为可靠合作而建立的服装批发公司",
      "Company Story": "公司历程",
      "Our Values": "我们的价值观",
      "Capabilities": "能力",
      "Complete Program Support for Garment Wholesale Growth": "为服装批发增长提供完整项目支持",
      "Program Services": "项目服务",
      "Product Scope": "产品范围",
      "How We Work": "我们的工作方式",
      "Simple Partnership Structure": "简明合作结构",
      "Factory & Process": "工厂与流程",
      "Manufacturing Systems Designed for Quality and Scale": "为品质与规模而设计的制造体系",
      "Production Flow": "生产流程",
      "Capacity Snapshot": "产能概览",
      "Quality Discipline": "质量管理",
      "Sustainability & Compliance": "可持续与合规",
      "Responsible Production Practices for Global Wholesale Buyers": "面向全球批发买家的责任生产实践",
      "Compliance Areas": "合规领域",
      "Certifications & Audits": "认证与审核",
      "Contact": "联系",
      "Let’s Discuss Your Garment Wholesale Requirements": "让我们沟通您的服装批发需求",
      "Partnership Inquiry Form": "合作咨询表",
      "FAQ": "常见问题"
    },
    "zh-TW": {
      "Global Wholesale Programs": "全球批發專案",
      "Build Stronger Apparel Partnerships With Mijenro International": "與 Mijenro International 建立更強的服裝合作關係",
      "Mijenro International supports growing brands and retail buyers with dependable garment sourcing, quality manufacturing, and compliant export operations. We are structured for long-term wholesale partnerships.": "Mijenro International 為成長品牌與零售買家提供可靠的服裝採購、優質製造與合規出口營運。我們專為長期批發合作而設計。",
      "Request Company Profile": "索取公司簡介",
      "Explore Capabilities": "查看能力",
      "OEM & ODM": "OEM 與 ODM",
      "Private Label Programs": "自有品牌專案",
      "Ethical Manufacturing": "合規製造",
      "Global Export Readiness": "全球出口就緒",
      "Years of export experience": "出口經驗年數",
      "Annual unit capacity": "年產能",
      "Countries served": "服務國家",
      "Partner Network": "合作網絡",
      "Trusted by Regional Retailers and Brand Operators": "受區域零售商與品牌方信賴",
      "Core Services": "核心服務",
      "What Mijenro Delivers for Wholesale Buyers": "Mijenro 為批發買家提供什麼",
      "Compliance + Process": "合規 + 流程",
      "Looking for a Long-Term Garment Wholesale Partner?": "正在尋找長期服裝批發合作夥伴？",
      "Send Inquiry": "送出詢問",
      "About Mijenro": "關於 Mijenro",
      "A Garment Wholesale Company Built for Reliable Partnership": "一家為可靠合作而建立的服裝批發公司",
      "Company Story": "公司歷程",
      "Our Values": "我們的價值觀",
      "Capabilities": "能力",
      "Complete Program Support for Garment Wholesale Growth": "為服裝批發成長提供完整專案支援",
      "Program Services": "專案服務",
      "Product Scope": "產品範圍",
      "How We Work": "我們如何合作",
      "Simple Partnership Structure": "簡明合作架構",
      "Factory & Process": "工廠與流程",
      "Manufacturing Systems Designed for Quality and Scale": "為品質與規模打造的製造系統",
      "Production Flow": "生產流程",
      "Capacity Snapshot": "產能概覽",
      "Quality Discipline": "品質管理",
      "Sustainability & Compliance": "永續與合規",
      "Responsible Production Practices for Global Wholesale Buyers": "面向全球批發買家的責任生產實踐",
      "Compliance Areas": "合規領域",
      "Certifications & Audits": "認證與稽核",
      "Contact": "聯絡",
      "Let’s Discuss Your Garment Wholesale Requirements": "讓我們討論您的服裝批發需求",
      "Partnership Inquiry Form": "合作諮詢表",
      "FAQ": "常見問題"
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

  const normalizeText = (value) =>
    (value || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const NORMALIZED_TEXT_TRANSLATIONS = Object.fromEntries(
    Object.entries(TEXT_TRANSLATIONS).map(([lang, entries]) => [
      lang,
      Object.fromEntries(
        Object.entries(entries).map(([source, target]) => [normalizeText(source), target])
      )
    ])
  );

  const applyTextTranslations = () => {
    const dict = NORMALIZED_TEXT_TRANSLATIONS[currentLang] || {};
    const nodes = document.querySelectorAll("h1,h2,h3,h4,p,span,a,button,label,li,div");

    nodes.forEach((el) => {
      if (el.hasAttribute("data-i18n")) return;
      if (el.children.length > 0 && el.childNodes.length !== 1) return;
      const raw = normalizeText(el.dataset.i18nBase || el.textContent || "");
      if (!raw) return;
      if (!el.dataset.i18nBase) {
        el.dataset.i18nBase = raw;
      }
      const base = normalizeText(el.dataset.i18nBase);
      if (dict[base]) {
        el.textContent = dict[base];
      } else if (currentLang === FALLBACK_LANG) {
        el.textContent = base;
      }
    });
  };

  const applyTranslations = () => {
    document.documentElement.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    applyTextTranslations();

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
