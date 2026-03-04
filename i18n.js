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
      "FAQ": "常见问题",
      "We collaborate with supermarkets, chain stores, e-commerce private labels, and promotional garment distributors.": "我们与超市连锁、连锁门店、电商自有品牌及促销服装分销商合作。",
      "OEM Manufacturing": "OEM 生产制造",
      "ODM Product Development": "ODM 产品开发",
      "Quality & Compliance Support": "质量与合规支持",
      "Scale-ready production lines for knitwear, woven garments, uniforms, and seasonal capsules with stable lead times.": "针织、梭织、制服和季节性系列均可规模化生产，并保持稳定交期。",
      "In-house sample and tech-pack support to accelerate design-to-delivery cycles for new product launches.": "提供内部打样与技术包支持，加速新品从设计到交付的周期。",
      "Documented quality checkpoints, social compliance monitoring, and full support for customer audit preparation.": "建立文档化质检节点、社会责任合规监控，并全程支持客户审厂准备。",
      "Operational Discipline Built for Partnership Confidence": "以运营纪律建立合作信心",
      "We combine the transparency of modern compliance programs with the consistency of industrial garment execution, so your teams can onboard and scale with less risk.": "我们将现代合规体系的透明度与工业化服装执行的一致性结合，帮助您的团队以更低风险完成导入与扩量。",
      "Pre-production review with fabric, trims, and workmanship approval.": "量产前完成面辅料与工艺标准审核确认。",
      "In-line inspection during cutting, sewing, and finishing stages.": "在裁剪、车缝和后整阶段执行过程检验。",
      "Final random inspection and packaging verification before shipment.": "出货前执行最终抽检与包装核验。",
      "Compliance file support for customer onboarding and annual re-audits.": "提供客户准入与年度复审所需的合规资料支持。",
      "Share your target category, volume, and timeline. We will provide a tailored capability proposal.": "请提供目标品类、需求量和时间计划，我们将给出定制化能力方案。",
      "From Trading Operations to Full Program Management": "从贸易执行到完整项目管理",
      "We started as a sourcing office for independent retailers and evolved into a full wholesale management company handling development, production planning, and export coordination.": "我们起步于独立零售商采购服务，现已发展为覆盖开发、生产计划与出口协调的综合批发管理公司。",
      "Foundation Stage": "奠基阶段",
      "Factory Integration": "工厂协同阶段",
      "Compliance Upgrade": "合规升级阶段",
      "Growth Partnership Model": "成长型合作模式",
      "Mijenro began with category-focused buying support for basic knit and woven programs.": "Mijenro 以基础针梭织项目的品类采购支持起步。",
      "Launched dedicated production planning workflows with strategic factory partners in South China.": "与华南战略工厂合作，建立专属生产计划流程。",
      "Implemented standardized social compliance and process quality documentation across major accounts.": "在主要客户项目中实施标准化社会责任合规与流程质量文档。",
      "Supporting established retailers and emerging brands with scalable garment wholesale operations.": "通过可扩展的服装批发运营支持成熟零售商与新兴品牌。",
      "What Partners Can Expect Working With Us": "与我们合作可获得的核心价值",
      "Accountability": "责任担当",
      "Transparency": "流程透明",
      "Scalability": "规模扩展",
      "Each program has clear ownership from sampling to shipment readiness.": "每个项目从打样到出货准备均有明确负责人。",
      "Structured updates on production milestones, quality status, and shipping progress.": "围绕生产里程碑、质量状态和出运进度提供结构化更新。",
      "Capacity planning designed to support both pilot volumes and larger reorder cycles.": "产能规划可同时支持试单规模与后续大货返单周期。",
      "Need a Stronger Vendor Narrative for Your Buying Team?": "想为采购团队建立更有说服力的供应商介绍？",
      "We can share a concise company deck and capability profile aligned to your target garment category.": "我们可提供精简公司介绍与能力资料，匹配您的目标服装品类。",
      "Request Introduction Pack": "索取介绍资料包",
      "Our production partner network combines modern machinery, skilled garment technicians, and process-driven quality assurance to support reliable wholesale fulfillment.": "我们的生产合作网络整合现代化设备、熟练技术人员与流程化质保体系，确保批发订单稳定交付。",
      "Five-Step Manufacturing Journey": "五步制造流程",
      "Adapted for wholesale programs requiring repeat quality at stable commercial lead times.": "专为要求稳定商业交期与一致复购品质的批发项目设计。",
      "Material Confirmation": "物料确认",
      "Precision Cutting": "精准裁剪",
      "Line Sewing Operations": "车缝线生产",
      "Finishing & Packing": "后整与包装",
      "Final Audit & Dispatch": "终检与出货",
      "Reliable garment wholesale manufacturing from development through shipment.": "从开发到出货，提供可靠的服装批发制造执行。"
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
    const dict = {
      ...(NORMALIZED_TEXT_TRANSLATIONS[currentLang] || {}),
      ...(currentLang === "zh-TW" ? NORMALIZED_TEXT_TRANSLATIONS["zh-CN"] || {} : {})
    };
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
