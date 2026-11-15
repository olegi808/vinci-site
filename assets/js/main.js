/* ==========================================================================
   Vinci Development — общий скрипт
   - Язык: ?lang=ka|en|ru → localStorage → язык браузера → ru.
   - Шапка и подвал подставляются в <div data-include="header|footer">,
     чтобы не дублировать разметку на каждой странице.
     При переходе на CMS/SSG (WordPress, Astro, 11ty) это станут partials.
   - Карточки проектов и новостей рендерятся из assets/js/data.js.
   - Переводы статичного текста — assets/js/i18n.js (атрибуты data-i18n*).
   ========================================================================== */
(function () {
  "use strict";
  const D = window.VINCI;
  const C = D.company;
  const I = window.VX_I18N;
  const page = document.body.dataset.page || "";

  /* ---------- Язык ---------- */
  const SUPPORTED = Object.keys(I.langs);
  const store = {
    get() { try { return localStorage.getItem("vx-lang"); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem("vx-lang", v); } catch (e) {} }
  };
  const urlLang = new URLSearchParams(location.search).get("lang");
  const browserLang = (navigator.language || "").slice(0, 2);
  const lang = [urlLang, store.get(), browserLang, "ru"].find((l) => SUPPORTED.includes(l));
  if (urlLang && SUPPORTED.includes(urlLang)) store.set(lang);
  document.documentElement.lang = lang;

  const t = (key) => (I[lang] && I[lang][key]) ?? I.ru[key] ?? key;
  const L = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.ru : v);
  const tel = (p) => "tel:" + p.replace(/[^\d+]/g, "");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const langHref = (l) => { const u = new URL(location.href); u.searchParams.set("lang", l); return u.pathname.split("/").pop() + u.search + u.hash; };

  const NAV = [
    { href: "index.html", key: "home" },
    { href: "about.html", key: "about" },
    { href: "projects.html", key: "projects" },
    { href: "services.html", key: "services" },
    { href: "news.html", key: "news" },
    { href: "contacts.html", key: "contacts" }
  ];

  const LOGO = `
    <span class="vx-logo">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill="#17212d"/>
        <path d="M9 12 L20 30 L31 12" fill="none" stroke="#8fb4dc" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 12 H26" stroke="#c4622d" stroke-width="3.2" stroke-linecap="round"/>
      </svg>
      <span class="vx-logo__text"><span class="vx-logo__name">VINCI</span><span class="vx-logo__sub">Development</span></span>
    </span>`;

  /* ---------- Шапка ---------- */
  const header = `
    <div class="vx-topbar d-none d-md-block">
      <div class="container d-flex justify-content-between align-items-center py-2">
        <div class="d-flex gap-4">
          <span><i class="bi bi-geo-alt me-1"></i>${esc(t("ui.address"))}</span>
          <span><i class="bi bi-clock me-1"></i>${esc(t("ui.hours"))}</span>
        </div>
        <div class="d-flex gap-4">
          <a href="mailto:${C.email}"><i class="bi bi-envelope me-1"></i>${C.email}</a>
          <a href="${C.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg vx-nav sticky-top py-2" aria-label="${esc(t("ui.mainNav"))}">
      <div class="container">
        <a class="navbar-brand" href="index.html" aria-label="${esc(t("ui.toHome"))}">${LOGO}</a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#vxMenu" aria-controls="vxMenu" aria-label="${esc(t("ui.openMenu"))}">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="vxMenu" aria-labelledby="vxMenuLabel">
          <div class="offcanvas-header">
            <span id="vxMenuLabel">${LOGO}</span>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="${esc(t("ui.close"))}"></button>
          </div>
          <div class="offcanvas-body align-items-lg-center">
            <ul class="navbar-nav mx-lg-auto">
              ${NAV.map((n) => `<li class="nav-item"><a class="nav-link${n.key === page ? " active" : ""}" ${n.key === page ? 'aria-current="page"' : ""} href="${n.href}">${esc(t("nav." + n.key))}</a></li>`).join("")}
            </ul>
            <div class="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-4 mt-lg-0">
              <div class="btn-group vx-lang align-self-start align-self-lg-center" role="group" aria-label="${esc(t("ui.lang"))}">
                ${SUPPORTED.map((l) => `<a class="btn btn-light${l === lang ? " active" : ""}" href="${langHref(l)}" hreflang="${l}" lang="${l}" title="${I.langs[l]}"${l === lang ? ' aria-current="true"' : ""}>${l === "ka" ? "GE" : l.toUpperCase()}</a>`).join("")}
              </div>
              <a class="btn btn-primary btn-sm" href="${tel(C.phones[0])}"><i class="bi bi-telephone me-2"></i>${C.phones[0]}</a>
            </div>
          </div>
        </div>
      </div>
    </nav>`;

  /* ---------- Подвал ---------- */
  const footer = `
    <footer class="vx-footer pt-5">
      <div class="container">
        <div class="row g-4 pb-4">
          <div class="col-lg-4">
            <a href="index.html" class="text-white d-inline-block mb-3" aria-label="${esc(t("ui.toHome"))}">${LOGO}</a>
            <p class="mb-3">${esc(t("ft.about"))}</p>
            <div class="d-flex gap-2">
              <a class="vx-social" href="${C.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
              <a class="vx-social" href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
              <a class="vx-social" href="https://wa.me/${C.phones[0].replace(/\D/g, "")}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          <div class="col-6 col-lg-2">
            <h4>${esc(t("ft.company"))}</h4>
            <ul>
              <li><a href="about.html">${esc(t("ft.aboutLink"))}</a></li>
              <li><a href="services.html">${esc(t("ft.services"))}</a></li>
              <li><a href="news.html">${esc(t("ft.news"))}</a></li>
              <li><a href="careers.html">${esc(t("ft.careers"))}</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2">
            <h4>${esc(t("ft.buyers"))}</h4>
            <ul>
              <li><a href="projects.html">${esc(t("ft.allProjects"))}</a></li>
              <li><a href="projects.html?status=active">${esc(t("ft.onSale"))}</a></li>
              <li><a href="buyers.html">${esc(t("ft.finance"))}</a></li>
              <li><a href="buyers.html#faq">${esc(t("ft.faq"))}</a></li>
            </ul>
          </div>
          <div class="col-lg-4">
            <h4>${esc(t("ft.contacts"))}</h4>
            <ul>
              <li><i class="bi bi-geo-alt me-2"></i><a href="${C.mapUrl}" target="_blank" rel="noopener">${esc(t("ui.address"))}</a></li>
              ${C.phones.map((p) => `<li><i class="bi bi-telephone me-2"></i><a href="${tel(p)}">${p}</a></li>`).join("")}
              <li><i class="bi bi-envelope me-2"></i><a href="mailto:${C.email}">${C.email}</a></li>
              <li><i class="bi bi-clock me-2"></i>${esc(t("ui.hours"))}</li>
            </ul>
          </div>
        </div>
        <div class="border-top border-secondary border-opacity-25 py-4 d-flex flex-column flex-md-row justify-content-between gap-2 small">
          <span>© ${C.since}–${new Date().getFullYear()} ${esc(t("ft.legal"))}</span>
          <span><a href="privacy.html">${esc(t("ft.privacy"))}</a></span>
        </div>
      </div>
    </footer>
    <button class="vx-totop" type="button" aria-label="${esc(t("ui.toTop"))}"><i class="bi bi-arrow-up"></i></button>`;

  document.querySelectorAll('[data-include="header"]').forEach((el) => (el.outerHTML = header));
  document.querySelectorAll('[data-include="footer"]').forEach((el) => (el.outerHTML = footer));

  /* ---------- Перевод статичного текста ---------- */
  if (lang !== "ru") {
    const dict = I[lang] || {};
    const has = (k) => Object.prototype.hasOwnProperty.call(dict, k);
    document.querySelectorAll("[data-i18n]").forEach((el) => { const k = el.dataset.i18n; if (has(k)) el.innerHTML = dict[k]; });
    const docKey = document.querySelector("title[data-i18n-doc]");
    if (docKey && has(docKey.dataset.i18nDoc)) document.title = `${dict[docKey.dataset.i18nDoc]} — Vinci Development`;
    [["ph", "placeholder"], ["alt", "alt"], ["aria", "aria-label"], ["content", "content"], ["title", "title"]].forEach(([suffix, attr]) => {
      document.querySelectorAll(`[data-i18n-${suffix}]`).forEach((el) => {
        const k = el.getAttribute(`data-i18n-${suffix}`);
        if (has(k)) el.setAttribute(attr, dict[k]);
      });
    });
  }

  /* ---------- Карточки ---------- */
  const projectCard = (p, i) => `
    <div class="col-sm-6 col-lg-4 vx-reveal" data-status="${p.status}">
      <a class="vx-project" href="project.html?id=${encodeURIComponent(p.id)}">
        <div class="vx-project__media">
          ${p.image ? `<img src="${esc(p.image)}" alt="${esc(L(p.title))}" loading="lazy">` : D.buildingSVG(p.floors || 5, p.palette, i)}
          <span class="vx-project__status${p.status === "active" ? " vx-project__status--active" : ""}">${esc(L(p.statusLabel))}</span>
        </div>
        <div class="vx-project__body">
          <div class="vx-project__district"><i class="bi bi-geo-alt me-1"></i>${esc(L(p.district))}</div>
          <h3 class="vx-project__title">${esc(L(p.title))}</h3>
          <div class="vx-project__meta">
            ${p.floors ? `<span><i class="bi bi-building"></i>${p.floors} ${esc(t("card.floors"))}</span>` : ""}
            ${p.apartments ? `<span><i class="bi bi-door-closed"></i>${p.apartments} ${esc(t("card.apts"))}</span>` : ""}
            <span><i class="bi bi-calendar3"></i>${esc(p.year)}</span>
          </div>
        </div>
      </a>
    </div>`;

  const KA_MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
  const fmtDate = (d) => {
    // не во всех браузерах есть грузинская локаль — форматируем вручную
    if (lang === "ka") { const [y, m, day] = d.split("-").map(Number); return `${day} ${KA_MONTHS[m - 1]}, ${y}`; }
    try { return new Date(d).toLocaleDateString(I.locale[lang], { day: "numeric", month: "long", year: "numeric" }); }
    catch (e) { return d; }
  };
  const newsCard = (n, i) => `
    <div class="col-md-6 col-lg-4 vx-reveal">
      <a class="vx-news" href="article.html?id=${encodeURIComponent(n.id)}">
        <div class="vx-news__media">${n.image ? `<img src="${esc(n.image)}" alt="" loading="lazy">` : D.newsSVG(i)}</div>
        <div class="vx-news__body">
          <div class="vx-news__meta"><span class="vx-news__tag">${esc(L(n.tag))}</span><time datetime="${n.date}">${fmtDate(n.date)}</time></div>
          <h3>${esc(L(n.title))}</h3>
          <p>${esc(L(n.excerpt))}</p>
          <span class="vx-news__more">${esc(t("card.read"))} <i class="bi bi-arrow-right"></i></span>
        </div>
      </a>
    </div>`;

  document.querySelectorAll("[data-projects]").forEach((el) => {
    const limit = parseInt(el.dataset.projects, 10) || D.projects.length;
    // Порядок задаётся в data.js (первые — на главной)
    el.innerHTML = D.projects.slice(0, limit).map(projectCard).join("");
  });
  document.querySelectorAll("[data-news]").forEach((el) => {
    const limit = parseInt(el.dataset.news, 10) || D.news.length;
    el.innerHTML = [...D.news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit).map(newsCard).join("");
  });

  /* Фильтр проектов */
  const filter = document.querySelector("[data-filter]");
  if (filter) {
    const apply = (val) => {
      filter.querySelectorAll(".btn").forEach((b) => b.classList.toggle("active", b.dataset.value === val));
      document.querySelectorAll("[data-projects] [data-status]").forEach((c) => {
        c.classList.toggle("d-none", val !== "all" && c.dataset.status !== val);
      });
    };
    filter.addEventListener("click", (e) => {
      const b = e.target.closest(".btn");
      if (b) apply(b.dataset.value);
    });
    apply(new URLSearchParams(location.search).get("status") || "all");
  }

  /* Детальная страница проекта */
  const projectHost = document.querySelector("[data-project-detail]");
  if (projectHost) {
    const id = new URLSearchParams(location.search).get("id");
    const p = D.projects.find((x) => x.id === id) || D.projects[0];
    document.title = `${L(p.title)} — Vinci Development`;
    document.querySelectorAll("[data-p]").forEach((el) => (el.textContent = L(p[el.dataset.p]) ?? "—"));
    const spec = [
      ["spec.status", L(p.statusLabel)], ["spec.district", L(p.district)], ["spec.floors", p.floors || "—"],
      ["spec.apts", p.apartments || "—"], ["spec.area", L(p.area)], ["spec.price", L(p.price)], ["spec.year", p.year]
    ];
    projectHost.querySelector("[data-spec]").innerHTML = spec.map(([k, v]) => `<div><small>${esc(t(k))}</small><strong>${esc(v)}</strong></div>`).join("");
    projectHost.querySelector("[data-features]").innerHTML = (L(p.features) || []).map((f) => `<li><i class="bi bi-check2-circle"></i><span>${esc(f)}</span></li>`).join("");
    projectHost.querySelector("[data-visual]").innerHTML = p.image ? `<img src="${esc(p.image)}" alt="${esc(L(p.title))}">` : D.buildingSVG(p.floors || 5, p.palette, 1);
  }

  /* Детальная страница новости */
  const articleHost = document.querySelector("[data-article]");
  if (articleHost) {
    const id = new URLSearchParams(location.search).get("id");
    const n = D.news.find((x) => x.id === id) || D.news[0];
    document.title = `${L(n.title)} — Vinci Development`;
    document.querySelector("[data-a-title]").textContent = L(n.title);
    articleHost.querySelector("[data-a-meta]").innerHTML = `<span class="vx-news__tag">${esc(L(n.tag))}</span> · <time datetime="${n.date}">${fmtDate(n.date)}</time>`;
    articleHost.querySelector("[data-a-lead]").textContent = L(n.excerpt);
    articleHost.querySelector("[data-a-visual]").innerHTML = D.newsSVG(0);
  }

  /* ---------- Поведение ---------- */
  const nav = document.querySelector(".vx-nav");
  const toTop = document.querySelector(".vx-totop");
  const onScroll = () => {
    nav && nav.classList.toggle("is-scrolled", window.scrollY > 10);
    toTop && toTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  /* Закрывать мобильное меню при переходе по якорю */
  document.querySelectorAll("#vxMenu .nav-link").forEach((a) =>
    a.addEventListener("click", () => {
      const oc = window.bootstrap && bootstrap.Offcanvas.getInstance("#vxMenu");
      oc && oc.hide();
    })
  );

  /* Появление блоков */
  const reveal = document.querySelectorAll(".vx-reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    reveal.forEach((el) => io.observe(el));
  } else reveal.forEach((el) => el.classList.add("is-visible"));

  /* Анимация цифр */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const to = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = to + suffix; return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / 1200);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
  });

  /* Форма заявки (клиентская валидация; отправку подключить к бэкенду / CRM) */
  document.querySelectorAll("form[data-lead]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
      // TODO: fetch("/api/lead", { method: "POST", body: new FormData(form) })
      form.innerHTML = `<div class="text-center py-4"><i class="bi bi-check2-circle display-5 text-success"></i><h3 class="h4 mt-3">${esc(t("form.thanks"))}</h3><p class="mb-0 opacity-75">${esc(t("form.callback"))} ${esc(t("ui.hours"))}.</p></div>`;
    });
  });
})();
