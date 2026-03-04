(() => {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".site-nav");
  const header = document.querySelector(".site-header");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Close" : "Menu";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      });
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const yearTargets = document.querySelectorAll("[data-year]");
  const year = String(new Date().getFullYear());
  yearTargets.forEach((target) => {
    target.textContent = year;
  });

  const revealTargets = document.querySelectorAll(
    "section, .card, .timeline-item, .kpi-item, .cta-banner, .table-wrap, .partner-strip"
  );

  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    const delay = Math.min((index % 6) * 70, 280);
    el.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
