/* ==========================================================================
   Renders the content from js/data.js and wires up page behaviour.
   You normally don't need to edit this file — change js/data.js instead.
   ========================================================================== */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ------------------------------ helpers ------------------------------ */

  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);
  const list = (value) => (Array.isArray(value) ? value : []);

  // Encode spaces etc. in file paths without double-encoding existing %XX.
  function href(path) {
    try {
      return encodeURI(decodeURI(path));
    } catch (e) {
      return encodeURI(path);
    }
  }

  function fileExt(path) {
    const match = String(path || "").split(/[?#]/)[0].match(/\.([a-z0-9]+)$/i);
    return match ? match[1].toLowerCase() : "";
  }

  function initials(name) {
    return String(name || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  // Simple line icons (24×24, stroke-based).
  const ICONS = {
    layers: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    flow: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="9" r="3"/><path d="M6 9v6"/><path d="M18 12a6 6 0 0 1-6 6H9"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10.01-3-3"/>',
    tick: '<path d="M20 6 9 17l-5-5"/>',
    cross: '<path d="M18 6 6 18M6 6l12 12"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    building: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 17.13V21"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'
  };

  function icon(name, cls = "") {
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.bulb}</svg>`;
  }

  // Photo with an initials fallback underneath (shown if the photo is missing or fails).
  function avatar(person) {
    const photo = person.photo
      ? `<img src="${esc(href(person.photo))}" alt="" loading="lazy" data-fallback>`
      : "";
    return `<div class="avatar"><span class="avatar-initials">${esc(initials(person.name))}</span>${photo}</div>`;
  }

  function socialLinks(person) {
    const links = [];
    if (person.email) {
      links.push(`<a href="mailto:${esc(person.email)}" aria-label="Email ${esc(person.name)}">${icon("mail")}</a>`);
    }
    if (person.linkedin) {
      links.push(`<a href="${esc(person.linkedin)}" target="_blank" rel="noopener" aria-label="${esc(person.name)} on LinkedIn">${icon("linkedin")}</a>`);
    }
    if (person.github) {
      links.push(`<a href="${esc(person.github)}" target="_blank" rel="noopener" aria-label="${esc(person.name)} on GitHub">${icon("github")}</a>`);
    }
    return links.length ? `<div class="socials">${links.join("")}</div>` : "";
  }

  function hideSection(id) {
    const section = document.getElementById(id);
    if (section) section.hidden = true;
    $$(`a[href="#${id}"]`).forEach((a) => {
      const item = a.closest("li");
      if (item) item.hidden = true;
    });
  }

  // Stagger the reveal animation of items in a grid.
  const delay = (i) => `style="--d:${Math.min(i, 6) * 70}ms"`;

  /* ------------------------------ renderers ------------------------------ */

  function renderProject() {
    const p = SITE.project || {};
    document.title = `${p.name} | Research Project ${p.groupId}`;

    $("#brand-name").textContent = p.name || "";
    $("#brand-id").textContent = `Research Project ${p.groupId || ""}`;

    $("#hero-badge").textContent = p.badge || "";
    let title = esc(p.title);
    if (p.highlight && title.includes(esc(p.highlight))) {
      title = title.replace(esc(p.highlight), `<span class="grad-text">${esc(p.highlight)}</span>`);
    }
    $("#hero-title").innerHTML = title;
    $("#hero-lead").textContent = p.tagline || "";

    $("#panel-id").textContent = `${p.groupId || ""} · ${p.name || ""}`;
    $("#hero-stats").innerHTML = list(p.stats)
      .map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`)
      .join("");
    $("#panel-foot").innerHTML = [p.university, p.faculty, p.academicYear]
      .filter(Boolean)
      .map(esc)
      .join("<br>");

    $("#footer-name").textContent = `${p.name || ""} Research Team`;
    $("#footer-sub").textContent = [`Research Project ${p.groupId || ""}`, p.university]
      .filter(Boolean)
      .join(" · ");
    $("#footer-copy").textContent = `© ${new Date().getFullYear()} ${p.name || ""}. All rights reserved.`;
  }

  function renderLiterature() {
    const lit = SITE.literature || {};
    $("#literature-text").innerHTML = list(lit.paragraphs).map((t) => `<p>${esc(t)}</p>`).join("");
    const points = list(lit.keyPoints);
    $("#literature-points").innerHTML = points.map((t) => `<li>${icon("tick")}<span>${esc(t)}</span></li>`).join("");
    if (!points.length) $(".lit-points").hidden = true;
  }

  function renderGaps() {
    $("#gap-list").innerHTML = list(SITE.researchGaps)
      .map(
        (g, i) => `
        <article class="card feature-card reveal" ${delay(i)}>
          <span class="icon-badge">${icon(g.icon)}</span>
          <h3>${esc(g.title)}</h3>
          <p>${esc(g.text)}</p>
        </article>`
      )
      .join("");

    const table = SITE.gapComparison || {};
    const rows = list(table.rows);
    if (!rows.length) {
      $("#gap-table-card").hidden = true;
      return;
    }
    const cols = list(table.columns);
    const last = cols.length - 1;
    const head = `<thead><tr><th scope="col">Feature</th>${cols
      .map((c, i) => `<th scope="col"${i === last ? ' class="ours"' : ""}>${esc(c)}</th>`)
      .join("")}</tr></thead>`;
    const body = rows
      .map(
        (r) => `<tr><th scope="row">${esc(r.feature)}</th>${list(r.values)
          .map(
            (v, i) =>
              `<td${i === last ? ' class="ours"' : ""}>${
                v
                  ? `<span class="mark yes">${icon("tick")}<span class="sr-only">Yes</span></span>`
                  : `<span class="mark no">${icon("cross")}<span class="sr-only">No</span></span>`
              }</td>`
          )
          .join("")}</tr>`
      )
      .join("");
    $("#gap-table").innerHTML = head + `<tbody>${body}</tbody>`;
  }

  function renderProblemSolution() {
    const pr = SITE.problem || {};
    const so = SITE.solution || {};
    const points = (items) =>
      list(items).length
        ? `<ul class="check-list">${list(items).map((t) => `<li>${icon("tick")}<span>${esc(t)}</span></li>`).join("")}</ul>`
        : "";

    $("#problem-card").innerHTML = `
      <span class="icon-badge">${icon("alert")}</span>
      <p class="ps-label">Research Problem</p>
      <h3>${esc(pr.question)}</h3>
      <p>${esc(pr.text)}</p>
      ${points(pr.points)}`;

    $("#solution-card").innerHTML = `
      <span class="icon-badge">${icon("check")}</span>
      <p class="ps-label">Proposed Solution</p>
      <h3>${esc(so.summary)}</h3>
      <p>${esc(so.text)}</p>
      ${points(so.points)}`;
  }

  function renderObjectives() {
    $("#main-objective").innerHTML = `
      <span class="icon-badge">${icon("target")}</span>
      <div>
        <p class="ps-label">Main Objective</p>
        <p class="main-objective-text">${esc(SITE.mainObjective)}</p>
      </div>`;

    $("#objective-list").innerHTML = list(SITE.objectives)
      .map(
        (o, i) => `
        <article class="card objective-card reveal" ${delay(i)}>
          <div class="objective-top">
            <span class="icon-badge">${icon(o.icon)}</span>
            <span class="objective-num">0${i + 1}</span>
          </div>
          <h3>${esc(o.title)}</h3>
          <p>${esc(o.text)}</p>
          ${o.owner ? `<p class="objective-owner">${icon("users")}<span>${esc(o.owner)}</span></p>` : ""}
        </article>`
      )
      .join("");
  }

  function renderMethodology() {
    const m = SITE.methodology || {};
    $("#method-text").innerHTML = list(m.paragraphs).map((t) => `<p>${esc(t)}</p>`).join("");
    $("#method-steps").innerHTML = list(m.steps)
      .map(
        (s, i) => `
        <li class="step reveal" ${delay(i)}>
          <span class="step-num">${i + 1}</span>
          <div><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>
        </li>`
      )
      .join("");

    if (m.diagram) {
      $("#diagram-card").innerHTML = `
        <button class="zoomable" type="button" data-lightbox="${esc(href(m.diagram))}" data-caption="${esc(m.diagramCaption)}" aria-label="Enlarge architecture diagram">
          <img src="${esc(href(m.diagram))}" alt="${esc(m.diagramCaption || "System architecture diagram")}" loading="lazy">
          <span class="zoom-hint">${icon("expand")} Click to enlarge</span>
        </button>
        ${m.diagramCaption ? `<figcaption>${esc(m.diagramCaption)}</figcaption>` : ""}`;
    } else {
      $("#diagram-card").hidden = true;
    }
  }

  function renderTechnologies() {
    const techs = list(SITE.technologies);
    if (!techs.length) return hideSection("technologies");
    $("#tech-list").innerHTML = techs
      .map(
        (t, i) => `
        <div class="tech-tile reveal" ${delay(i)}>
          <span class="tech-logo">
            <span class="tech-fallback">${esc(initials(t.name))}</span>
            ${t.icon ? `<img src="${esc(t.icon)}" alt="" loading="lazy" data-fallback>` : ""}
          </span>
          <span class="tech-name">${esc(t.name)}</span>
        </div>`
      )
      .join("");
  }

  function renderScreenshots() {
    const shots = list(SITE.screenshots);
    if (!shots.length) return hideSection("screenshots");
    $("#gallery").innerHTML = shots
      .map(
        (s, i) => `
        <figure class="shot reveal" ${delay(i)}>
          <button class="zoomable" type="button" data-lightbox="${esc(href(s.src))}" data-caption="${esc(s.caption)}" aria-label="Enlarge: ${esc(s.caption)}">
            <img src="${esc(href(s.src))}" alt="${esc(s.caption)}" loading="lazy">
          </button>
          ${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ""}
        </figure>`
      )
      .join("");
  }

  function milestoneStatus(m) {
    if (m.status) return String(m.status).toLowerCase();
    const date = m.date ? new Date(`${m.date}T23:59:59`) : null;
    if (!date || isNaN(date)) return "planned";
    const daysLeft = (date - new Date()) / 86400000;
    if (daysLeft < 0) return "completed";
    return daysLeft <= 45 ? "upcoming" : "planned";
  }

  function formatDate(value) {
    if (!value) return "Date TBD";
    const date = new Date(`${value}T00:00:00`);
    if (isNaN(date)) return value;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function renderMilestones() {
    const items = list(SITE.milestones);
    if (!items.length) return hideSection("milestones");
    const labels = { completed: "Completed", upcoming: "Upcoming", planned: "Planned" };
    const statuses = items.map(milestoneStatus);
    const done = statuses.filter((s) => s === "completed").length;
    const percent = Math.round((done / items.length) * 100);

    $("#timeline-summary").innerHTML = `
      <div class="progress-text"><strong>${done} of ${items.length}</strong> milestones completed</div>
      <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-label="Milestones completed">
        <span style="width:${percent}%"></span>
      </div>
      <div class="legend">
        <span class="legend-item completed">Completed</span>
        <span class="legend-item upcoming">Upcoming</span>
        <span class="legend-item planned">Planned</span>
      </div>`;

    $("#timeline").innerHTML = items
      .map((m, i) => {
        const status = statuses[i];
        return `
        <li class="tl-item ${esc(status)} reveal">
          <span class="tl-dot">${status === "completed" ? icon("tick") : ""}</span>
          <article class="card tl-card">
            <div class="tl-top">
              <h3>${esc(m.title)}</h3>
              <span class="status-chip ${esc(status)}">${esc(labels[status] || status)}</span>
            </div>
            <div class="tl-meta">
              <span class="chip">${icon("calendar")}${esc(m.dateText || formatDate(m.date))}</span>
              ${m.marks ? `<span class="chip">${icon("award")}${esc(m.marks)} of final marks</span>` : ""}
            </div>
            ${m.text ? `<p>${esc(m.text)}</p>` : ""}
          </article>
        </li>`;
      })
      .join("");
  }

  const PREVIEWABLE = ["pdf", "png", "jpg", "jpeg", "gif", "webp", "svg", "txt", "mp4"];

  function downloadCard(item, i) {
    const ext = fileExt(item.file);
    const viewPath = item.viewFile || (PREVIEWABLE.includes(ext) ? item.file : "");
    let actions;
    if (item.file) {
      actions = `
        ${viewPath ? `<a class="btn-sm" href="${esc(href(viewPath))}" target="_blank" rel="noopener">${icon("eye")}View</a>` : ""}
        <a class="btn-sm btn-sm-primary" href="${esc(href(item.file))}" download>${icon("download")}Download</a>`;
    } else {
      actions = `<span class="pending-chip">${icon("clock")}Coming soon</span>`;
    }
    return `
      <article class="dl-card reveal ${item.file ? "" : "is-pending"}" ${delay(i)}>
        <span class="file-badge ${ext ? `ft-${esc(ext)}` : "ft-none"}">${ext ? esc(ext.toUpperCase()) : icon("clock")}</span>
        <div class="dl-body">
          <h4>${esc(item.title)}</h4>
          ${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ""}
        </div>
        <div class="dl-actions">${actions}</div>
      </article>`;
  }

  function renderDownloads() {
    ["documents", "presentations"].forEach((key) => {
      const items = list(SITE[key]);
      if (!items.length) return hideSection(key);
      const ready = items.filter((it) => it.file).length;
      $(`#${key}-count`).textContent = `${ready}/${items.length} available`;
      $(`#${key}-list`).innerHTML = items.map(downloadCard).join("");
    });
  }

  function personCard(person, i, isSupervisor) {
    return `
      <article class="card person-card reveal" ${delay(i)}>
        ${avatar(person)}
        <span class="role-chip">${esc(person.role)}</span>
        <h3>${esc(person.name)}</h3>
        ${isSupervisor
          ? `${person.title ? `<p class="person-sub">${esc(person.title)}</p>` : ""}<p class="person-detail">${esc(person.department)}</p>`
          : `<p class="person-sub">${esc(person.itNumber)}</p><p class="person-detail">${esc(person.component)}</p>`}
        ${socialLinks(person)}
      </article>`;
  }

  function renderTeam() {
    $("#team-list").innerHTML = list(SITE.team).map((p, i) => personCard(p, i, false)).join("");
    const sups = list(SITE.supervisors);
    $("#supervisor-list").innerHTML = sups.map((p, i) => personCard(p, i, true)).join("");
    if (!sups.length) {
      $("#supervisor-list").hidden = true;
      $(".sub-head").hidden = true;
    }
  }

  function renderContact() {
    const c = SITE.contact || {};
    const p = SITE.project || {};
    $("#contact-note").textContent = c.note || "";
    const rows = [
      c.email && { icon: "mail", label: "Email", value: `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` },
      c.phone && { icon: "phone", label: "Phone", value: `<a href="tel:${esc(c.phone.replace(/\s+/g, ""))}">${esc(c.phone)}</a>` },
      p.university && { icon: "building", label: "University", value: esc(p.university) },
      c.address && { icon: "pin", label: "Address", value: esc(c.address) }
    ].filter(Boolean);
    $("#contact-list").innerHTML = rows
      .map(
        (r) => `
        <li>
          <span class="icon-badge small">${icon(r.icon)}</span>
          <div><span class="contact-label">${r.label}</span><span class="contact-value">${r.value}</span></div>
        </li>`
      )
      .join("");
  }

  // Swap broken images for their initials/fallback underneath.
  function wireImageFallbacks() {
    $$("img[data-fallback]").forEach((img) => {
      const drop = () => img.remove();
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) drop();
      else img.addEventListener("error", drop, { once: true });
    });
  }

  /* ------------------------------ behaviour ------------------------------ */

  function initNavbar() {
    const navbar = $("#navbar");
    const toggle = $("#menu-toggle");
    const backToTop = $("#back-to-top");

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 16);
      backToTop.classList.toggle("show", window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$("#nav-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });

    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Highlight the nav item for the section currently in view.
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const topLinks = $$(".nav-links > li > .nav-link");
    const subLinks = $$(".dropdown a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const group = entry.target.dataset.nav;
          const id = entry.target.id;
          topLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${group}`));
          subLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("[data-nav]").forEach((section) => observer.observe(section));
  }

  function initReveal() {
    const items = $$(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    // Once shown, drop the reveal classes so the element's normal hover transitions apply.
    const settle = (e) => {
      if (e.target !== e.currentTarget || e.propertyName !== "opacity") return;
      e.currentTarget.classList.remove("reveal", "visible");
      e.currentTarget.removeEventListener("transitionend", settle);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.addEventListener("transitionend", settle);
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => observer.observe(el));
  }

  function initTheme() {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const current = () => root.getAttribute("data-theme") || (media.matches ? "dark" : "light");
    $("#theme-toggle").addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage unavailable — theme still applies for this visit */
      }
    });
  }

  function initLightbox() {
    const box = $("#lightbox");
    const img = $("#lightbox-img");
    const caption = $("#lightbox-caption");
    let opener = null;

    const close = () => {
      box.hidden = true;
      document.body.classList.remove("lightbox-open");
      img.src = "";
      if (opener) opener.focus();
    };

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-lightbox]");
      if (trigger) {
        opener = trigger;
        img.src = trigger.dataset.lightbox;
        img.alt = trigger.dataset.caption || "";
        caption.textContent = trigger.dataset.caption || "";
        box.hidden = false;
        document.body.classList.add("lightbox-open");
        $(".lightbox-close", box).focus();
        return;
      }
      if (!box.hidden && (e.target === box || e.target.closest(".lightbox-close"))) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !box.hidden) close();
    });
  }

  // No backend on GitHub Pages: the form opens the visitor's email app instead.
  function initContactForm() {
    const form = $("#contact-form");
    const note = $("#form-note");
    const to = (SITE.contact || {}).email;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (!to) {
        note.textContent = "The group email hasn't been added yet. Please check back soon.";
        note.className = "form-note error";
        return;
      }
      const data = new FormData(form);
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
      note.textContent = `Your email app should open now. If it doesn't, email us at ${to}.`;
      note.className = "form-note success";
      form.reset();
    });
  }

  /* ------------------------------ start ------------------------------ */

  renderProject();
  renderLiterature();
  renderGaps();
  renderProblemSolution();
  renderObjectives();
  renderMethodology();
  renderTechnologies();
  renderScreenshots();
  renderMilestones();
  renderDownloads();
  renderTeam();
  renderContact();
  wireImageFallbacks();

  initNavbar();
  initScrollSpy();
  initReveal();
  initTheme();
  initLightbox();
  initContactForm();
})();
