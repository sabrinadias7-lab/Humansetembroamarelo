/* =====================================================================
   HUMAN. script.js
   SPA sem framework: roteamento por hash, hubs interativos,
   práticas com timer, checklist de ergonomia, reconhecimento,
   busca global, lista pessoal e microinterações.
   ===================================================================== */

(function () {
  "use strict";

  const D = window.HUMAN_DATA;
  const ICON = window.HUMAN_ICONS;
  const app = document.getElementById("app");
  const SUPABASE_URL = "https://gfvvyjyiqpjnwvdwrfwk.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FWEsMTYn7cclvVAyhIpM0g_Y6jUJgPy";


  /* ==================================================================
     1. UTILITÁRIOS
     ================================================================== */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const icon = (name, cls = "") =>
    `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ICON.spark}</svg>`;

  const arrow = () => icon("arrow", "ico--arrow");

  const store = {
    get(k, fb) { try { const v = localStorage.getItem("human:" + k); return v === null ? fb : JSON.parse(v); } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem("human:" + k, JSON.stringify(v)); } catch (e) { /* silencioso */ } }
  };

  /* Índice de todos os itens navegáveis dos hubs */
  const ITEMS = {};
  (function indexItems() {
    Object.keys(D.hubs).forEach((hubId) => {
      const hub = D.hubs[hubId];
      const push = (it) => { if (it && it.id) ITEMS[it.id] = Object.assign({ hub: hubId }, it); };
      (hub.blocks || []).forEach((b) => (b.items || []).forEach(push));
      (hub.contents || []).forEach(push);
      (hub.ideas || []).forEach(push);
      (hub.platforms || []).forEach(push);
    });
  })();

  /* ==================================================================
     2. TOAST
     ================================================================== */
  let toastTimer = null;
  function toast(message, kind = "") {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = `${icon(kind === "ok" ? "check" : "info")}<span>${esc(message)}</span>`;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2600);
  }

  /* ==================================================================
     3. MINHA LISTA
     ================================================================== */
  let saved = store.get("saved", []);

  function isSaved(id) { return saved.indexOf(id) !== -1; }

  function toggleSaved(id) {
    const i = saved.indexOf(id);
    if (i === -1) { saved.push(id); toast("Salvo na sua lista.", "ok"); }
    else { saved.splice(i, 1); toast("Removido da sua lista."); }
    store.set("saved", saved);
    paintSavedCount();
    $$("[data-save]").forEach((b) => b.classList.toggle("is-on", isSaved(b.dataset.save)));
  }

  function paintSavedCount() {
    const badge = $("#savedCount");
    if (!badge) return;
    badge.textContent = saved.length;
    badge.hidden = saved.length === 0;
  }

  function openSavedList() {
    const items = saved.map((id) => ITEMS[id]).filter(Boolean);
    openModal(`
      <span class="eyebrow eyebrow--accent">Minha lista</span>
      <h2 class="h2 mt-12">${items.length ? "Guardado para depois" : "Sua lista está vazia"}</h2>
      ${items.length
        ? `<div class="list-mini mt-20">${items.map((it) => `
            <button class="list-mini__row" data-item="${it.id}">
              <span class="ico-tile ico-tile--sm">${icon(it.icon)}</span>
              <span>
                <span class="list-mini__t">${esc(it.title)}</span>
                <span class="list-mini__m">${esc(it.type)}${it.minutes ? " · " + it.minutes + " min" : ""}</span>
              </span>
              ${arrow()}
            </button>`).join("")}</div>`
        : `<p class="lead mt-12">Use o ícone de marcador nos conteúdos para guardar o que quiser ver depois.</p>`}
    `);
  }

  /* ==================================================================
     4. MODAL
     ================================================================== */
  const modal = $("#modal");
  const modalBody = $("#modalBody");
  let modalTimer = null;

  function openModal(html) {
    modalBody.innerHTML = html;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (modalTimer) { clearInterval(modalTimer); modalTimer = null; }
  }

  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });

  /* ---- ficha de item (prática, conteúdo ou recurso) ---- */
  function openItem(id) {
    const it = ITEMS[id];
    if (!it) return;
    const isPratica = it.kind === "pratica";

    openModal(`
      <div class="modal__head">
        <span class="ico-tile ico-tile--accent">${icon(it.icon)}</span>
        <span>
          <span class="eyebrow eyebrow--accent">${esc(it.type)}${it.minutes ? " · " + it.minutes + " min" : ""}</span>
          <h2 class="h2 mt-6">${esc(it.title)}</h2>
        </span>
      </div>
      <p class="lead mt-14">${esc(it.text)}</p>
      <ol class="steps mt-20">
        ${(it.points || []).map((p) => `<li><span>${esc(p)}</span></li>`).join("")}
      </ol>
      <div class="modal__actions">
        ${isPratica && it.minutes
          ? `<button class="btn btn--accent" id="mStart">${icon("play")} Iniciar ${it.minutes} min</button>`
          : `<button class="btn btn--accent" id="mOpen">${esc(it.cta || "Abrir")} ${arrow()}</button>`}
        <button class="btn btn--ghost${isSaved(it.id) ? " is-on" : ""}" data-save="${it.id}">${icon("bookmark")} Salvar</button>
      </div>
      <div id="mTimer"></div>
      <p class="modal__note">Conteúdo fictício deste protótipo. Em um ambiente real, este botão levaria direto à plataforma ou ao canal responsável.</p>
    `);

    if ($("#mStart")) $("#mStart").addEventListener("click", () => runTimer($("#mTimer"), it.minutes, it.title));
    if ($("#mOpen")) $("#mOpen").addEventListener("click", () => toast("Conteúdo fictício do protótipo."));
  }

  /* ---- timer reutilizável ----
     onFinish(completed, secondsDone) é opcional: chamado tanto quando o
     tempo termina naturalmente (completed = true) quanto quando a pessoa
     encerra antes (completed = false). Usado pelo Especial Setembro
     Amarelo para registrar o momento sem duplicar a lógica do cronômetro. */
  function runTimer(container, minutes, label, onFinish) {
    if (modalTimer) clearInterval(modalTimer);
    const total = minutes * 60;
    let left = total;

    container.innerHTML = `
      <div class="timer">
        <div class="timer__ring">
          <svg viewBox="0 0 76 76"><circle class="timer__bg" cx="38" cy="38" r="34"></circle><circle class="timer__fg" cx="38" cy="38" r="34" stroke-dasharray="213.6" stroke-dashoffset="0"></circle></svg>
          <span class="timer__count" id="tCount">${minutes}:00</span>
        </div>
        <div class="timer__info">
          <p class="h3" id="tTitle">${esc(label)}</p>
          <p class="small muted" id="tHint">Pode deixar a tela de lado. Avisamos no fim.</p>
        </div>
        <button class="btn btn--ghost btn--sm" id="tStop">Encerrar</button>
      </div>`;

    const countEl = $("#tCount", container);
    const fg = $(".timer__fg", container);

    const tick = () => {
      const m = Math.floor(left / 60), s = left % 60;
      countEl.textContent = `${m}:${String(s).padStart(2, "0")}`;
      fg.style.strokeDashoffset = String(213.6 * (1 - left / total));
      if (left <= 0) {
        clearInterval(modalTimer); modalTimer = null;
        countEl.textContent = "✓";
        $("#tTitle", container).textContent = "Tempo concluído.";
        $("#tHint", container).textContent = "Obrigado por reservar esse tempo para você.";
        container.querySelector(".timer").classList.add("is-done");
        toast("Pausa concluída.", "ok");
        if (onFinish) onFinish(true, total);
      }
      left--;
    };
    tick();
    modalTimer = setInterval(tick, 1000);
    $("#tStop", container).addEventListener("click", () => {
      const done = Math.max(total - left, 0);
      clearInterval(modalTimer); modalTimer = null; container.innerHTML = "";
      if (onFinish) onFinish(false, done);
    });
  }

  /* ---- ficha de benefício ---- */
  function openBenefit(id) {
    const b = D.benefits.find((x) => x.id === id);
    if (!b) return;
    openModal(`
      <div class="modal__head">
        <span class="ico-tile ico-tile--accent">${icon(b.icon)}</span>
        <span>
          <span class="eyebrow eyebrow--accent">${esc(b.category)}</span>
          <h2 class="h2 mt-6">${esc(b.name)}</h2>
        </span>
      </div>
      <div class="def mt-22">
        <div class="def__row"><span class="def__k">${icon("target")} Para que serve</span><p>${esc(b.forWhat)}</p></div>
        <div class="def__row"><span class="def__k">${icon("compass")} Como acessar</span><p>${esc(b.how)}</p></div>
        ${b.support ? `<div class="def__row"><span class="def__k">${icon("shieldCheck")} Confidencial</span><p>O acesso é sigiloso e não passa pela sua liderança.</p></div>` : ""}
      </div>
      <div class="modal__actions">
        <button class="btn btn--accent" id="bGo">Ver como acessar ${arrow()}</button>
        <a class="btn btn--ghost" href="#/beneficios" data-close>Ver todos</a>
      </div>
      <p class="modal__note">Benefício fictício, criado para demonstrar o padrão do HUMAN: o que é, para que serve e como acessar.</p>
    `);
    $("#bGo").addEventListener("click", () => toast("Em produção, este botão abriria o portal do benefício."));
  }

  /* ---- delegação global de cliques ---- */
  document.addEventListener("click", (e) => {
    const save = e.target.closest("[data-save]");
    if (save) { e.stopPropagation(); toggleSaved(save.dataset.save); return; }

    const item = e.target.closest("[data-item]");
    if (item) { openItem(item.dataset.item); return; }

    const ben = e.target.closest("[data-benefit]");
    if (ben) { openBenefit(ben.dataset.benefit); return; }

    const again = e.target.closest("[data-sa-again]");
    if (again) { openExperience(again.dataset.saAgain); return; }

    const jump = e.target.closest("[data-jump]");
    if (jump) {
      const target = document.getElementById(jump.dataset.jump);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* ==================================================================
     5. COMPONENTES
     ================================================================== */
  function statRow(stats) {
    return `<div class="stats">${stats.map((s) =>
      `<div class="stat"><b>${esc(s.v)}</b><span>${esc(s.k)}</span></div>`).join("")}</div>`;
  }

  function blockHead(b) {
    return `
      <div class="block-head">
        <span class="ico-tile">${icon(b.icon)}</span>
        <div>
          <h2 class="block-head__t">${esc(b.label)}</h2>
          ${b.hint ? `<p class="block-head__h">${esc(b.hint)}</p>` : ""}
        </div>
      </div>`;
  }

  function actionCard(it) {
    return `
      <button class="acard" data-item="${it.id}">
        <span class="acard__top">
          <span class="ico-tile ico-tile--lg">${icon(it.icon)}</span>
          <span class="badge">${it.minutes} min</span>
        </span>
        <span class="acard__t">${esc(it.title)}</span>
        <span class="acard__d">${esc(it.text)}</span>
        <span class="acard__cta">${esc(it.cta || "Começar")} ${arrow()}</span>
      </button>`;
  }

  function contentCard(it) {
    return `
      <article class="ccard">
        <button class="ccard__main" data-item="${it.id}">
          <span class="ccard__meta">${icon(it.icon)} ${esc(it.type)}${it.minutes ? " · " + it.minutes + " min" : ""}</span>
          <span class="ccard__t">${esc(it.title)}</span>
          <span class="ccard__d">${esc(it.text)}</span>
          <span class="ccard__cta">${esc(it.cta || "Abrir")} ${arrow()}</span>
        </button>
        <button class="save-btn${isSaved(it.id) ? " is-on" : ""}" data-save="${it.id}" aria-label="Salvar para depois" title="Salvar para depois">${icon("bookmark")}</button>
      </article>`;
  }

  function itemCard(it) {
    return it.kind === "pratica" ? actionCard(it) : contentCard(it);
  }

  function hubHeader(hub, id) {
    return `
      <section class="hub-head">
        <div class="wrap">
          <nav class="crumbs"><a href="#/">Início</a><span>/</span><span>${esc(dimName(id))}</span></nav>
          <div class="hub-head__top">
            <span class="ico-tile ico-tile--xl ico-tile--accent">${icon(hub.icon)}</span>
            <div>
              <h1 class="h1">${esc(hub.title)}</h1>
              <p class="lead mt-8">${esc(hub.lead)}</p>
            </div>
          </div>
          ${statRow(hub.stats)}
          <div class="jumps">${hubJumps(hub, id)}</div>
        </div>
      </section>`;
  }

  function dimName(id) {
    const d = D.dimensions.find((x) => x.id === id);
    return d ? d.name : "";
  }

  function hubJumps(hub, id) {
    const list = [];
    (hub.blocks || []).forEach((b) => list.push({ id: "b-" + b.id, label: b.label, icon: b.icon }));
    if (id === "mente") list.push({ id: "b-apoio", label: "Preciso de apoio", icon: "shield" });
    if (id === "corpo") list.push({ id: "b-ergo", label: "Ergonomia", icon: "chair" }, { id: "b-cont", label: "Conteúdos", icon: "book" });
    if (id === "conexoes") list.push({ id: "b-hist", label: "Histórias", icon: "chat" }, { id: "b-rec", label: "Reconheça alguém", icon: "heart" }, { id: "b-ideias", label: "Ideias", icon: "spark" });
    if (id === "aprender") list.push({ id: "b-plat", label: "Quero me desenvolver", icon: "cap" });
    return list.map((j) => `<button class="jump" data-jump="${j.id}">${icon(j.icon)} ${esc(j.label)}</button>`).join("");
  }

  /* ==================================================================
     6. VIEW · HOME
     ================================================================== */
  function viewHome() {
    const highlights = D.benefits.filter((b) => b.highlight).slice(0, 4);
    return `
    <section class="hero">
      <span class="hero__glow" aria-hidden="true"></span>
      <span class="hero__glow hero__glow--2" aria-hidden="true"></span>
      <div class="wrap hero__inner">
        <div class="hero__brand">
          <h1 class="hero__word">HU<span>M</span>AN</h1>
          <p class="hero__concept">Tecnologia como meio.<br>Cuidado como propósito.</p>
        </div>
        <p class="lead hero__purpose">${esc(D.brand.purpose)}</p>
        <div class="hero__meta">
          <span class="pill">${icon("grid")} 6 dimensões</span>
          <span class="pill">${icon("gift")} ${D.benefits.length} benefícios</span>
          <span class="pill">${icon("clock")} Pausas de 2 a 15 min</span>
        </div>
      </div>
    </section>

    <section class="wrap question">
      <div class="reveal">
        <span class="eyebrow eyebrow--accent">Comece por aqui</span>
        <h2 class="h1 question__title">O que você <em>precisa</em> hoje?</h2>
      </div>
      <div class="needs reveal">
        ${D.needs.map((n) => `
          <a class="need${n.quiet ? " need--quiet" : ""}" href="${n.route}">
            <span class="need__icon">${icon(n.icon)}</span>
            <span class="need__go">${arrow()}</span>
            <span class="need__label">${esc(n.label)}</span>
            <span class="need__hint">${esc(n.hint)}</span>
          </a>`).join("")}
      </div>
    </section>

    <section class="wrap section--tight">
      <a class="sa-banner reveal" href="#/setembro-amarelo">
        <div class="sa-banner__text">
          <span class="sa-banner__eyebrow">${esc(D.setembroAmarelo.entrada.eyebrow)}</span>
          <h2 class="h2 mt-10">${esc(D.setembroAmarelo.entrada.title)}</h2>
          <p class="lead mt-10">${esc(D.setembroAmarelo.entrada.text)}</p>
          <span class="btn btn--yellow mt-20">${esc(D.setembroAmarelo.entrada.cta)} ${arrow()}</span>
        </div>
        <span class="ico-tile ico-tile--yellow ico-tile--xl sa-banner__icon">${icon("heart")}</span>
      </a>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <span class="eyebrow">Para você hoje</span>
            <h2 class="h2 mt-10">Pequenas ações que cabem no seu dia</h2>
            <p class="lead">Sugestões rápidas que levam poucos minutos.</p>
          </div>
          <a class="link-arrow" href="#/pausa">Ver 5 Minutos Para Mim ${arrow()}</a>
        </div>
        <div class="grid grid--4 reveal">
          ${D.todaySuggestions.map((s) => `
            <a class="tcard" href="${s.link}">
              <span class="tcard__top">${icon(s.icon)}<span class="tcard__p">${esc(s.period)}</span></span>
              <span class="tcard__t">${esc(s.title)}</span>
              <span class="tcard__f"><span class="badge">${s.minutes} min</span>${arrow()}</span>
            </a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap">
        <div class="feature-strip reveal">
          <span class="eyebrow">Conheça seus benefícios</span>
          <h2 class="h2 mt-12" style="max-width:18ch">Você tem mais do que imagina.</h2>
          <p class="lead mt-14" style="max-width:46ch">O que é, para que serve e como acessar. Em uma tela só.</p>
          <div class="grid grid--4 mt-32">
            ${highlights.map((b) => `
              <button class="bmini" data-benefit="${b.id}">
                <span class="ico-tile ico-tile--ghost">${icon(b.icon)}</span>
                <span class="bmini__cat">${esc(b.category)}</span>
                <span class="bmini__n">${esc(b.name)}</span>
                <span class="bmini__d">${esc(b.short)}</span>
              </button>`).join("")}
          </div>
          <div class="mt-30"><a class="btn btn--accent" href="#/beneficios">Ver todos os benefícios ${arrow()}</a></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <span class="eyebrow">O ecossistema</span>
            <h2 class="h2 mt-10">Seis dimensões, uma experiência</h2>
          </div>
        </div>
        <div class="dims reveal">
          ${D.dimensions.map((d, i) => `
            <a class="dim" href="${d.route || "#/dimensao/" + d.id}">
              <span class="dim__n">0${i + 1}</span>
              <span class="ico-tile ico-tile--lg">${icon(d.icon)}</span>
              <span class="dim__name">${esc(d.name)}</span>
              <span class="dim__tag">${esc(d.tagline)}</span>
              <span class="dim__go"><span class="badge">${esc(d.count)}</span>${arrow()}</span>
            </a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <span class="eyebrow">5 minutos para você</span>
            <h2 class="h2 mt-10">Quanto tempo você tem agora?</h2>
            <p class="lead">Escolha o tempo e receba uma sugestão.</p>
          </div>
        </div>
        <div class="time-picker time-picker--home reveal">
          ${D.pauseOptions.map((t) => `<a class="time-opt" href="#/pausa?t=${t}"><b>${t}</b><span>min</span></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <span class="eyebrow">Histórias que conectam</span>
            <h2 class="h2 mt-10">Pessoas que encontraram o que já existia</h2>
          </div>
          <a class="link-arrow" href="#/dimensao/conexoes">Ver mais histórias ${arrow()}</a>
        </div>
        <div class="grid grid--4 reveal">
          ${D.stories.slice(0, 4).map(storyCard).join("")}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="wrap">
        <div class="case-teaser reveal">
          <div>
            <span class="eyebrow eyebrow--accent">Sobre o projeto</span>
            <h2 class="h2 mt-12">De estratégia de RH a produto digital</h2>
            <p class="lead mt-12" style="max-width:44ch">O raciocínio por trás da experiência, em uma página.</p>
            <div class="mt-24"><a class="btn btn--primary" href="#/case">Ver o case ${arrow()}</a></div>
          </div>
          <div class="flow">
            ${D.caseStudy.flow.map((f, i) => `
              <div class="flow__step">
                <span class="ico-tile">${icon(f.icon)}</span>
                <b>${esc(f.t)}</b>
                <span>${esc(f.d)}</span>
                ${i < D.caseStudy.flow.length - 1 ? `<i class="flow__arrow">${arrow()}</i>` : ""}
              </div>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
  }

  function storyCard(s) {
    return `
      <article class="story">
        <span class="story__theme">${esc(s.theme)}</span>
        <p class="story__quote">${esc(s.quote)}</p>
        <div class="story__who">
          <span class="avatar">${esc(initials(s.name))}</span>
          <span><span class="story__name">${esc(s.name)}</span><br><span class="story__role">${esc(s.role)}</span></span>
        </div>
      </article>`;
  }

  /* ==================================================================
     7. VIEW · HUBS
     ================================================================== */
  function viewHub(id) {
    const hub = D.hubs[id];
    if (!hub) return "";
    let html = hubHeader(hub, id);

    (hub.blocks || []).forEach((b) => {
      html += `
        <section class="section section--tight" id="b-${b.id}">
          <div class="wrap">
            ${blockHead(b)}
            <div class="grid ${b.layout === "action" ? "grid--4 grid--action" : "grid--3"} reveal">
              ${b.items.map(itemCard).join("")}
            </div>
          </div>
        </section>`;
    });

    if (id === "mente") html += supportBlock(hub.support);
    if (id === "corpo") html += ergoBlock(hub.ergonomia) + contentsBlock(hub.contents);
    if (id === "conexoes") html += connectBlocks(hub);
    if (id === "aprender") html += platformsBlock(hub.platforms);

    html += `<div class="wrap"><div class="note-line">${icon("info")}<p>${esc(D.brand.disclaimer)}</p></div></div>`;
    return html;
  }

  function supportBlock(s) {
    return `
    <section class="section section--tight" id="b-apoio">
      <div class="wrap">
        <div class="support-panel reveal">
          <div class="support-panel__intro">
            <span class="ico-tile ico-tile--xl ico-tile--ghost">${icon("shield")}</span>
            <h2 class="h2 mt-16">${esc(s.title)}</h2>
            <p class="lead mt-10">${esc(s.text)}</p>
            <a class="btn btn--accent mt-20" href="#/apoio">Ver todos os canais ${arrow()}</a>
          </div>
          <div class="support-panel__grid">
            ${s.items.map((i) => `
              <div class="sitem">
                <span class="ico-tile ico-tile--ghost">${icon(i.icon)}</span>
                <b>${esc(i.name)}</b>
                <span>${esc(i.how)}</span>
              </div>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
  }

  function ergoBlock(e) {
    return `
    <section class="section section--tight" id="b-ergo">
      <div class="wrap">
        ${blockHead({ label: e.title, hint: e.text, icon: "chair" })}
        <div class="ergo reveal">
          <div class="ergo__list" id="ergoList">
            ${e.items.map((i, k) => `
              <button class="ergo__item" data-ergo="${k}" aria-pressed="false">
                <span class="ergo__check">${icon("check")}</span>
                <span class="ico-tile ico-tile--sm">${icon(i.icon)}</span>
                <span class="ergo__txt"><b>${esc(i.label)}</b><span>${esc(i.tip)}</span></span>
              </button>`).join("")}
          </div>
          <aside class="ergo__side">
            <div class="ring" id="ergoRing">
              <svg viewBox="0 0 120 120"><circle class="ring__bg" cx="60" cy="60" r="52"></circle><circle class="ring__fg" cx="60" cy="60" r="52" stroke-dasharray="326.7" stroke-dashoffset="326.7"></circle></svg>
              <span class="ring__v" id="ergoV">0/5</span>
            </div>
            <p class="ergo__msg" id="ergoMsg">${esc(e.results.low)}</p>
            <button class="btn btn--ghost btn--sm" id="ergoReset">Recomeçar</button>
          </aside>
        </div>
      </div>
    </section>`;
  }

  function contentsBlock(items) {
    return `
    <section class="section section--tight" id="b-cont">
      <div class="wrap">
        ${blockHead({ label: "Conteúdos", hint: "Sono, movimento, ergonomia e energia", icon: "book" })}
        <div class="grid grid--4 reveal">${items.map(contentCard).join("")}</div>
      </div>
    </section>`;
  }

  function connectBlocks(hub) {
    return `
    <section class="section section--tight" id="b-hist">
      <div class="wrap">
        ${blockHead({ label: "Histórias que conectam", hint: "Relatos curtos de quem trabalha aqui", icon: "chat" })}
        <div class="grid grid--3 reveal">${D.stories.map(storyCard).join("")}</div>
      </div>
    </section>

    <section class="section section--tight" id="b-rec">
      <div class="wrap">
        <div class="recog reveal">
          <div class="recog__left">
            <span class="ico-tile ico-tile--xl ico-tile--accent">${icon("heart")}</span>
            <h2 class="h2 mt-16">Quem tornou sua semana melhor?</h2>
            <p class="lead mt-10">Reconhecimento específico vale mais que elogio genérico.</p>
            <ul class="ticks mt-18">
              <li>${icon("check")} Diga o que a pessoa fez</li>
              <li>${icon("check")} Diga qual foi o efeito</li>
              <li>${icon("check")} Envie hoje</li>
            </ul>
          </div>
          <form class="recog__form" id="recogForm" novalidate>
            <label class="fld">
              <span>Nome</span>
              <input type="text" id="recName" placeholder="Para quem vai o reconhecimento" maxlength="40" required>
            </label>
            <label class="fld">
              <span>Mensagem curta</span>
              <textarea id="recMsg" rows="3" placeholder="O que essa pessoa fez e o que mudou" maxlength="180" required></textarea>
              <i class="fld__count" id="recCount">0/180</i>
            </label>
            <button class="btn btn--accent" type="submit">${icon("send")} Reconhecer alguém</button>
            <p class="fld__note">Interação demonstrativa. Nada é enviado para fora do seu navegador.</p>
          </form>
        </div>
        <div class="mural" id="mural" hidden>
          <span class="eyebrow">Mural desta sessão</span>
          <div class="mural__grid" id="muralGrid"></div>
        </div>
      </div>
    </section>

    <section class="section section--tight" id="b-ideias">
      <div class="wrap">
        ${blockHead({ label: "Ideias para se conectar", hint: "Escolha uma e faça ainda hoje", icon: "spark" })}
        <div class="grid grid--4 grid--action reveal">${hub.ideas.map(actionCard).join("")}</div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap">
        ${blockHead({ label: "Grupos de afinidade", hint: "Seis comunidades abertas a todos", icon: "users" })}
        <div class="chips-grid reveal">
          ${hub.groups.map((g) => `<button class="gchip" data-group="${esc(g.name)}">${icon(g.icon)} ${esc(g.name)} ${arrow()}</button>`).join("")}
        </div>
      </div>
    </section>`;
  }

  function platformsBlock(items) {
    return `
    <section class="section section--tight" id="b-plat">
      <div class="wrap">
        ${blockHead({ label: "Quero me desenvolver", hint: "Plataformas e programas da empresa", icon: "cap" })}
        <div class="grid grid--4 reveal">
          ${items.map((p) => `
            <button class="pcard" data-item="${p.id}">
              <span class="ico-tile ico-tile--lg">${icon(p.icon)}</span>
              <span class="pcard__type">${esc(p.type)}</span>
              <span class="pcard__t">${esc(p.title)}</span>
              <span class="pcard__d">${esc(p.text)}</span>
              <span class="acard__cta">${esc(p.cta)} ${arrow()}</span>
            </button>`).join("")}
        </div>
      </div>
    </section>`;
  }

  /* ---- comportamentos do hub ---- */
  function mountHub(id) {
    if (id === "corpo") mountErgo();
    if (id === "conexoes") mountRecog();
  }

  function mountErgo() {
    const hub = D.hubs.corpo.ergonomia;
    const list = $("#ergoList");
    const marks = new Array(hub.items.length).fill(false);
    const fg = $(".ring__fg");
    const total = hub.items.length;

    function paint() {
      const n = marks.filter(Boolean).length;
      $("#ergoV").textContent = `${n}/${total}`;
      fg.style.strokeDashoffset = String(326.7 * (1 - n / total));
      $("#ergoMsg").textContent = n <= 1 ? hub.results.low : (n < total ? hub.results.mid : hub.results.high);
      $("#ergoRing").classList.toggle("is-full", n === total);
    }

    list.addEventListener("click", (e) => {
      const b = e.target.closest("[data-ergo]");
      if (!b) return;
      const k = Number(b.dataset.ergo);
      marks[k] = !marks[k];
      b.classList.toggle("is-on", marks[k]);
      b.setAttribute("aria-pressed", String(marks[k]));
      paint();
      if (marks.every(Boolean)) toast("Espaço ajustado. Bom trabalho.", "ok");
    });

    $("#ergoReset").addEventListener("click", () => {
      marks.fill(false);
      $$("[data-ergo]", list).forEach((b) => { b.classList.remove("is-on"); b.setAttribute("aria-pressed", "false"); });
      paint();
    });

    paint();
  }

  function mountRecog() {
    const form = $("#recogForm");
    const mural = $("#mural");
    const grid = $("#muralGrid");
    const msg = $("#recMsg");

    msg.addEventListener("input", () => { $("#recCount").textContent = `${msg.value.length}/180`; });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#recName").value.trim();
      const text = msg.value.trim();
      if (!name || !text) { toast("Preencha o nome e a mensagem."); return; }

      mural.hidden = false;
      const card = document.createElement("article");
      card.className = "mcard";
      card.innerHTML = `
        <span class="avatar avatar--accent">${esc(initials(name))}</span>
        <div>
          <b>${esc(name)}</b>
          <p>${esc(text)}</p>
        </div>`;
      grid.prepend(card);
      form.reset();
      $("#recCount").textContent = "0/180";
      toast("Reconhecimento publicado no mural.", "ok");
      setTimeout(() => mural.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120);
    });

    document.addEventListener("click", (e) => {
      const g = e.target.closest("[data-group]");
      if (g) toast(`Você entrou no grupo ${g.dataset.group}.`, "ok");
    });
  }

  /* ==================================================================
     8. VIEW · BENEFÍCIOS
     ================================================================== */
  function viewBenefits() {
    return `
    <section class="hub-head">
      <div class="wrap">
        <nav class="crumbs"><a href="#/">Início</a><span>/</span><span>Meus Benefícios</span></nav>
        <div class="hub-head__top">
          <span class="ico-tile ico-tile--xl ico-tile--accent">${icon("gift")}</span>
          <div>
            <h1 class="h1">Qual benefício você procura?</h1>
            <p class="lead mt-8">O que é, para que serve e como acessar.</p>
          </div>
        </div>
        <div class="toolbar">
          <div class="field">
            ${icon("search")}
            <input type="text" id="benQ" placeholder="Buscar benefício" autocomplete="off">
          </div>
          <div class="tagrow" id="benFilters"></div>
          <span class="toolbar__count" id="benCount"></span>
        </div>
      </div>
    </section>

    <section class="wrap section--tight">
      <div class="grid grid--3" id="benGrid"></div>
    </section>`;
  }

  function mountBenefits() {
    let cat = "Todos", q = "";
    const filters = $("#benFilters");
    const grid = $("#benGrid");

    filters.innerHTML = D.benefitCategories.map((c) =>
      `<button class="chip${c === cat ? " is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

    function render() {
      const nq = norm(q);
      const items = D.benefits.filter((b) => {
        const okC = cat === "Todos" || b.category === cat;
        const hay = norm(b.name + " " + b.short + " " + b.forWhat + " " + b.category);
        return okC && (!nq || hay.includes(nq));
      });

      grid.innerHTML = items.length ? items.map((b) => `
        <button class="bcard" data-benefit="${b.id}">
          <span class="bcard__top">
            <span class="ico-tile ico-tile--lg">${icon(b.icon)}</span>
            <span class="tag">${esc(b.category)}</span>
          </span>
          <span class="bcard__n">${esc(b.name)}</span>
          <span class="bcard__d">${esc(b.short)}</span>
          <span class="bcard__cta">Ver como acessar ${arrow()}</span>
        </button>`).join("")
        : `<div class="empty" style="grid-column:1/-1"><b>Nada encontrado.</b>Ajuste a busca ou escolha outra categoria.</div>`;

      $("#benCount").textContent = `${items.length} ${items.length === 1 ? "benefício" : "benefícios"}`;
      observeReveal();
    }

    filters.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      cat = b.dataset.cat;
      $$(".chip", filters).forEach((c) => c.classList.toggle("is-active", c.dataset.cat === cat));
      render();
    });
    $("#benQ").addEventListener("input", (e) => { q = e.target.value; render(); });
    render();
  }

  /* ==================================================================
     9. VIEW · 5 MINUTOS PARA MIM
     ================================================================== */
  function viewPause() {
    return `
    <section class="hub-head hub-head--center">
      <div class="wrap">
        <nav class="crumbs crumbs--center"><a href="#/">Início</a><span>/</span><span>5 Minutos Para Mim</span></nav>
        <span class="ico-tile ico-tile--xl ico-tile--accent mx-auto mt-20">${icon("clock")}</span>
        <h1 class="h1 mt-18">Quanto tempo você tem agora?</h1>
        <p class="lead mt-10">Escolha o tempo e veja o que cabe nele.</p>
        <div class="time-picker" id="timePicker">
          ${D.pauseOptions.map((t) => `<button class="time-opt" data-time="${t}"><b>${t}</b><span>min</span></button>`).join("")}
        </div>
        <button class="btn btn--ghost mt-20" id="randomBtn">${icon("shuffle")} Me sugira algo</button>
      </div>
    </section>

    <section class="wrap section--tight">
      <div id="pauseSlot"></div>
    </section>`;
  }

  let pauseTimer = null;

  function mountPause(preset) {
    const picker = $("#timePicker");
    const slot = $("#pauseSlot");
    let current = null;

    function stop() { if (pauseTimer) { clearInterval(pauseTimer); pauseTimer = null; } }

    function renderList(t) {
      current = t;
      const list = D.pauses[t];
      slot.innerHTML = `
        <div class="pause-grid" id="pauseGrid">
          ${list.map((p, i) => `
            <button class="pcard pcard--pause" data-pause="${i}">
              <span class="ico-tile ico-tile--lg">${icon(p.icon)}</span>
              <span class="pcard__type">${esc(p.kind)} · ${t} min</span>
              <span class="pcard__t">${esc(p.title)}</span>
              <span class="pcard__d">${esc(p.text)}</span>
              <span class="acard__cta">Fazer agora ${arrow()}</span>
            </button>`).join("")}
        </div>
        <div id="pauseDetail"></div>`;
      observeReveal();
    }

    function renderDetail(t, i) {
      const p = D.pauses[t][i];
      const box = $("#pauseDetail");
      $$("[data-pause]").forEach((b) => b.classList.toggle("is-active", Number(b.dataset.pause) === i));
      box.innerHTML = `
        <div class="pause-card">
          <div class="pause-card__head">
            <span class="ico-tile ico-tile--accent">${icon(p.icon)}</span>
            <span class="eyebrow eyebrow--accent">${esc(p.kind)} · ${t} minutos</span>
          </div>
          <h2 class="h2 mt-14">${esc(p.title)}</h2>
          <p class="pause-card__text">${esc(p.text)}</p>
          <p class="pause-card__why">${icon("spark")}<span><b>Por que funciona:</b> ${esc(p.why)}</span></p>
          <div class="pause-card__actions">
            <button class="btn btn--accent" id="pStart">${icon("play")} Iniciar ${t} min</button>
            <button class="btn btn--ghost" id="pOther">${icon("shuffle")} Sugerir outra</button>
          </div>
          <div id="pTimerSlot"></div>
        </div>`;
      box.scrollIntoView({ behavior: "smooth", block: "nearest" });

      $("#pStart").addEventListener("click", () => runPauseTimer(t, p.title));
      $("#pOther").addEventListener("click", () => {
        const n = D.pauses[t].length;
        renderDetail(t, (i + 1 + Math.floor(Math.random() * (n - 1))) % n);
      });
    }

    function runPauseTimer(minutes, label) {
      stop();
      const container = $("#pTimerSlot");
      const total = minutes * 60;
      let left = total;
      container.innerHTML = `
        <div class="timer">
          <div class="timer__ring">
            <svg viewBox="0 0 76 76"><circle class="timer__bg" cx="38" cy="38" r="34"></circle><circle class="timer__fg" cx="38" cy="38" r="34" stroke-dasharray="213.6" stroke-dashoffset="0"></circle></svg>
            <span class="timer__count" id="pCount">${minutes}:00</span>
          </div>
          <div class="timer__info">
            <p class="h3" id="pTitle">${esc(label)}</p>
            <p class="small muted" id="pHint">Pode deixar a tela de lado.</p>
          </div>
          <button class="btn btn--ghost btn--sm" id="pStop">Encerrar</button>
        </div>`;
      const countEl = $("#pCount"), fg = $(".timer__fg", container);
      const tick = () => {
        const m = Math.floor(left / 60), s = left % 60;
        countEl.textContent = `${m}:${String(s).padStart(2, "0")}`;
        fg.style.strokeDashoffset = String(213.6 * (1 - left / total));
        if (left <= 0) {
          stop();
          countEl.textContent = "✓";
          $("#pTitle").textContent = "Tempo concluído.";
          $("#pHint").textContent = "Obrigado por reservar esse tempo.";
          container.querySelector(".timer").classList.add("is-done");
          toast("Pausa concluída.", "ok");
        }
        left--;
      };
      tick();
      pauseTimer = setInterval(tick, 1000);
      $("#pStop").addEventListener("click", () => { stop(); container.innerHTML = ""; });
    }

    picker.addEventListener("click", (e) => {
      const b = e.target.closest("[data-time]");
      if (!b) return;
      const t = Number(b.dataset.time);
      $$(".time-opt", picker).forEach((o) => o.classList.toggle("is-active", o === b));
      stop();
      renderList(t);
      store.set("lastPause", t);
    });

    document.addEventListener("click", pauseClickHandler);
    function pauseClickHandler(e) {
      const b = e.target.closest("[data-pause]");
      if (b && current) renderDetail(current, Number(b.dataset.pause));
    }

    $("#randomBtn").addEventListener("click", () => {
      const t = current || D.pauseOptions[Math.floor(Math.random() * D.pauseOptions.length)];
      if (!current) {
        const btn = picker.querySelector(`[data-time="${t}"]`);
        if (btn) btn.click();
      }
      const n = D.pauses[t].length;
      renderDetail(t, Math.floor(Math.random() * n));
      toast("Sugestão sorteada para você.", "ok");
    });

    const initial = preset && D.pauses[preset] ? Number(preset) : 5;
    const btn = picker.querySelector(`[data-time="${initial}"]`);
    if (btn) btn.click();
  }

  /* ==================================================================
     10. VIEW · APOIO
     ================================================================== */
  function viewSupport() {
    return `
    <section class="hub-head">
      <div class="wrap">
        <nav class="crumbs"><a href="#/">Início</a><span>/</span><span>Apoio</span></nav>
        <div class="hub-head__top">
          <span class="ico-tile ico-tile--xl ico-tile--accent">${icon("shield")}</span>
          <div>
            <h1 class="h1">Você não precisa resolver sozinho</h1>
            <p class="lead mt-8">Canais confidenciais, sem passar pela liderança.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap section--tight">
      <div class="grid grid--3 reveal">
        ${D.support.map((s) => `
          <article class="support-item${s.tone === "primary" ? " support-item--primary" : ""}">
            <span class="ico-tile ico-tile--lg${s.tone === "primary" ? " ico-tile--ghost" : ""}">${icon(s.icon)}</span>
            <h3 class="support-item__name">${esc(s.name)}</h3>
            <p class="support-item__what">${esc(s.what)}</p>
            <p class="support-item__how">${esc(s.how)}</p>
          </article>`).join("")}
      </div>

      <div class="note-line note-line--accent mt-32">
        ${icon("info")}
        <p>${esc(D.brand.disclaimer)} Em caso de risco imediato, procure atendimento de emergência ou o canal de acolhimento 24h.</p>
      </div>

      <div class="section-head mt-48">
        <div>
          <span class="eyebrow">Também pode ajudar</span>
          <h2 class="h2 mt-10">Conteúdos de apoio não clínico</h2>
        </div>
        <a class="link-arrow" href="#/dimensao/mente">Ver o hub Mente ${arrow()}</a>
      </div>
      <div class="grid grid--3 reveal">
        ${D.hubs.mente.blocks[1].items.slice(0, 3).map(contentCard).join("")}
      </div>
    </section>`;
  }

  /* ==================================================================
     11. VIEW · CASE
     ================================================================== */
  function viewCase() {
    const c = D.caseStudy;
    return `
    <section class="hub-head">
      <div class="wrap">
        <nav class="crumbs"><a href="#/">Início</a><span>/</span><span>O Case</span></nav>
        <div class="hub-head__top">
          <span class="ico-tile ico-tile--xl ico-tile--accent">${icon("compass")}</span>
          <div>
            <h1 class="h1">HUMAN em uma página</h1>
            <p class="lead mt-8">Employee Experience aplicado a produto digital.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap section--tight">
      <div class="case-grid reveal">
        ${c.blocks.map((b) => `
          <article class="case-card">
            <span class="ico-tile ico-tile--lg">${icon(b.icon)}</span>
            <span class="case-card__l">${esc(b.label)}</span>
            <p class="case-card__t">${esc(b.text)}</p>
          </article>`).join("")}
      </div>

      <div class="section-head mt-56">
        <div><span class="eyebrow">Como funciona</span><h2 class="h2 mt-10">Da necessidade à ação</h2></div>
      </div>
      <div class="flow flow--wide reveal">
        ${c.flow.map((f, i) => `
          <div class="flow__step">
            <span class="ico-tile ico-tile--lg">${icon(f.icon)}</span>
            <b>${esc(f.t)}</b>
            <span>${esc(f.d)}</span>
            ${i < c.flow.length - 1 ? `<i class="flow__arrow">${arrow()}</i>` : ""}
          </div>`).join("")}
      </div>

      <div class="section-head mt-56">
        <div><span class="eyebrow">Princípios</span><h2 class="h2 mt-10">O que guiou cada tela</h2></div>
      </div>
      <div class="grid grid--4 reveal">
        ${c.principles.map((p) => `
          <article class="card">
            <span class="ico-tile">${icon(p.icon)}</span>
            <span class="card__title mt-14">${esc(p.t)}</span>
            <span class="card__text">${esc(p.d)}</span>
          </article>`).join("")}
      </div>

      <div class="section-head mt-56">
        <div><span class="eyebrow">Indicadores</span><h2 class="h2 mt-10">Hipóteses de valor</h2></div>
      </div>
      <div class="grid grid--4 reveal">
        ${c.metrics.map((m) => `
          <div class="metric">
            <div class="metric__v">${esc(m.v)}</div>
            <div class="metric__k">${esc(m.k)}</div>
            <div class="metric__d">${esc(m.d)}</div>
          </div>`).join("")}
      </div>
      <p class="small muted mt-18">Indicadores hipotéticos, definidos como meta do produto conceitual.</p>

      <div class="feature-strip reveal mt-56">
        <span class="eyebrow">Conceito de marca</span>
        <h2 class="h2 mt-12" style="max-width:18ch">Tecnologia como meio. Cuidado como propósito.</h2>
        <p class="lead mt-14" style="max-width:48ch">Nenhuma interface cuida de alguém. Mas ela pode encurtar a distância até quem cuida.</p>
        <div class="mt-28"><a class="btn btn--accent" href="#/">Voltar à experiência ${arrow()}</a></div>
      </div>
    </section>`;
  }

  /* ==================================================================
     11-B. ESPECIAL SETEMBRO AMARELO
     "Cuidar da vida não cabe em um mês."

     Reaproveita integralmente: runTimer() (estendido com onFinish,
     ver seção 4), openModal()/closeModal(), store, toast(), blockHead(),
     o padrão visual de .acard/.tag/.support-panel/.recog e a delegação
     global de cliques (só foi acrescentado o ramo [data-sa-again]).

     Nada aqui atribui nota, streak ou avaliação. Toda experiência pode
     ser repetida quantas vezes a pessoa quiser.
     ================================================================== */

  function saTempoLabel(exp) {
    return exp.tempoLivre ? "Sem tempo fixo" : `${exp.tempo} min`;
  }

  /* referência ao render() do calendário, para atualizá-lo ao vivo
     quando um momento é registrado na mesma visita à página */
  let saCalRefresh = null;

  function saDateKey(d) {
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  function saFmtHora(d) {
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  /* ---- registro do momento (♥ "Fiz por mim") + mensagem de reconhecimento ---- */
  function saRegistrar(exp, opts) {
    const momentos = store.get("setembroMomentos", []);
    momentos.push({
      ts: new Date().toISOString(),
      id: exp.id, titulo: exp.titulo, categoria: exp.categoria,
      tempoPlanejado: exp.tempoLivre ? null : exp.tempo,
      tempoFeito: opts.tempoFeitoMin != null ? opts.tempoFeitoMin : null,
      concluido: !!opts.completed
    });
    store.set("setembroMomentos", momentos);
    if (saCalRefresh) saCalRefresh();

    const M = D.setembroAmarelo.mensagensReconhecimento;
    if (opts.semTimer) return M.semTimer;
    if (!opts.completed) return M.interrompida;
    const arr = M[exp.categoria] || M.pausa;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function saRecognitionHTML(msg, exp) {
    return `
      <div class="sa-recognition"><p>${esc(msg)}</p></div>
      <div class="modal__actions">
        <button class="btn btn--ghost btn--sm" data-sa-again="${exp.id}">Fazer este momento de novo</button>
        <button class="btn btn--ghost btn--sm" data-jump="sa-tempo" data-close>Ver Meu Tempo por Mim</button>
      </div>`;
  }

  /* ---- ficha de uma experiência (reaproveita a estrutura do modal) ---- */
  function openExperience(id) {
    const exp = D.setembroAmarelo.experiencias.find((e) => e.id === id);
    if (exp) renderExperience(exp);
  }

  function renderExperience(exp) {
    const cat = D.setembroAmarelo.categorias[exp.categoria];
    openModal(`
      <div class="modal__head">
        <span class="ico-tile ico-tile--yellow">${icon(exp.icon)}</span>
        <span>
          <span class="eyebrow eyebrow--accent">${esc(cat.label)} · ${esc(saTempoLabel(exp))}</span>
          <h2 class="h2 mt-6">${esc(exp.titulo)}</h2>
        </span>
      </div>
      <p class="lead mt-14">${esc(exp.texto)}</p>
      <div class="def mt-20">
        <div class="def__row"><span class="def__k">${icon("target")} O que precisa</span><p>${esc(exp.precisa)}</p></div>
        <div class="def__row"><span class="def__k">${icon("compass")} Onde fazer</span><p>${esc(exp.onde)}</p></div>
      </div>
      ${exp.passos && exp.passos.length ? `<ol class="steps mt-20">${exp.passos.map((p) => `<li><span>${esc(p)}</span></li>`).join("")}</ol>` : ""}
      ${exp.buscar ? `<p class="pause-card__why mt-16">${icon("search")}<span>${esc(exp.buscar)}</span></p>` : ""}
      <div class="modal__actions" id="saActions">
        ${exp.usaTimer
          ? `<button class="btn btn--yellow" id="saStart">${icon("play")} Iniciar ${exp.tempo} min</button>`
          : `<button class="btn btn--yellow" id="saGoing">Vou fazer 💛</button>`}
      </div>
      <div id="saTimerSlot"></div>
      <p class="modal__note">${exp.usaTimer
        ? "Você não precisa terminar o tempo até o fim para esse momento valer. Dá para encerrar quando quiser."
        : "Você pode fazer isso quantas vezes quiser, hoje ou em outro dia."}</p>
    `);

    if (exp.usaTimer) {
      $("#saStart").addEventListener("click", () => {
        $("#saStart").disabled = true;
        runTimer($("#saTimerSlot"), exp.tempo, exp.titulo, (completed, secondsDone) => {
          const msg = saRegistrar(exp, { completed, tempoFeitoMin: Math.round(secondsDone / 60) });
          $("#saTimerSlot").innerHTML = saRecognitionHTML(msg, exp);
        });
      });
    } else {
      $("#saGoing").addEventListener("click", () => {
        $("#saActions").innerHTML = `<button class="btn btn--yellow" id="saDone">${icon("heart")} Fiz por mim</button>`;
        $("#saDone").addEventListener("click", () => {
          const msg = saRegistrar(exp, { completed: true, tempoFeitoMin: null, semTimer: true });
          $("#saActions").innerHTML = "";
          $("#saTimerSlot").innerHTML = saRecognitionHTML(msg, exp);
        });
      });
    }
  }

  /* ---- cartão do banco de experiências (reaproveita .acard/.tag) ---- */
  function saExpCard(exp) {
    const cat = D.setembroAmarelo.categorias[exp.categoria];
    return `
      <button class="acard" data-exp="${exp.id}">
        <span class="acard__top">
          <span class="ico-tile ico-tile--lg">${icon(exp.icon)}</span>
          <span class="badge">${esc(saTempoLabel(exp))}</span>
        </span>
        <span class="tag sa-tag--${exp.categoria} mt-10">${esc(cat.label)}</span>
        <span class="acard__t mt-8">${esc(exp.titulo)}</span>
        <span class="acard__d">${esc(exp.texto)}</span>
        <span class="acard__cta">Ver experiência ${arrow()}</span>
      </button>`;
  }

  /* ---- gerador do caça-palavras "Encontre em Você" ---- */
  function saBuildWordSearch(words, size) {
    const grid = Array.from({ length: size }, () => Array(size).fill(null));
    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
    const rnd = (n) => Math.floor(Math.random() * n);
    const range = (dim, len) => (dim === 1 ? [0, size - len] : dim === -1 ? [len - 1, size - 1] : [0, size - 1]);

    words.slice().sort((a, b) => b.length - a.length).forEach((word) => {
      let placed = false;
      for (let attempt = 0; attempt < 300 && !placed; attempt++) {
        const [dr, dc] = dirs[rnd(dirs.length)];
        const [rMin, rMax] = range(dr, word.length);
        const [cMin, cMax] = range(dc, word.length);
        if (rMax < rMin || cMax < cMin) continue;
        const r = rMin + rnd(rMax - rMin + 1);
        const c = cMin + rnd(cMax - cMin + 1);
        let fits = true;
        for (let i = 0; i < word.length && fits; i++) {
          const cell = grid[r + dr * i][c + dc * i];
          if (cell !== null && cell !== word[i]) fits = false;
        }
        if (fits) {
          for (let i = 0; i < word.length; i++) grid[r + dr * i][c + dc * i] = word[i];
          placed = true;
        }
      }
    });

    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (!grid[r][c]) grid[r][c] = abc[rnd(abc.length)];
    return grid;
  }

  function saWordSearchHTML(state) {
    const cells = state.grid.map((row, r) => row.map((ch, c) => {
      const key = r + "-" + c;
      return `<button class="sa-ws__cell${state.foundCells.has(key) ? " is-found" : ""}" data-r="${r}" data-c="${c}">${ch}</button>`;
    }).join("")).join("");
    return `
      <div class="sa-ws" style="--sa-ws-size:${state.grid.length}">${cells}</div>
      <div class="sa-ws__words">${state.words.map((w) => `<span class="sa-ws__word${state.found.has(w) ? " is-found" : ""}">${w}</span>`).join("")}</div>
      <div id="saWsReflexao"></div>`;
  }

  function saGameEncontre() {
    const cfg = D.setembroAmarelo.jogos.encontreEmVoce;
    const shuffle = (arr) => arr.slice().sort(() => Math.random() - .5);
    let words = shuffle(cfg.palavras).slice(0, 6);
    let state = { grid: saBuildWordSearch(words, 11), words, found: new Set(), foundCells: new Set() };
    let drag = null;

    function lineCoords(r0, c0, r, c) {
      const dR = r - r0, dC = c - c0;
      const steps = Math.max(Math.abs(dR), Math.abs(dC));
      if (!steps) return [`${r0}-${c0}`];
      const straight = dR === 0 || dC === 0 || Math.abs(dR) === Math.abs(dC);
      if (!straight) return [];
      const dr = Math.sign(dR), dc = Math.sign(dC);
      return Array.from({length: steps + 1}, (_, i) => `${r0 + dr*i}-${c0 + dc*i}`);
    }

    function clearSelecting() { $$(".sa-ws__cell.is-selecting").forEach(el => el.classList.remove("is-selecting")); }
    function paint(coords) {
      clearSelecting();
      coords.forEach(k => {
        const [r,c] = k.split("-");
        const el = $(`.sa-ws__cell[data-r="${r}"][data-c="${c}"]`);
        if (el && !el.classList.contains("is-found")) el.classList.add("is-selecting");
      });
    }
    function wordFrom(coords) { return coords.map(k => { const [r,c]=k.split("-").map(Number); return state.grid[r][c]; }).join(""); }

    function render() {
      openModal(`
        <span class="eyebrow eyebrow--accent">Momento leve</span>
        <h2 class="h2 mt-10">${esc(cfg.titulo)}</h2>
        <p class="lead mt-10">${esc(cfg.intro)}</p>
        ${saWordSearchHTML(state)}
      `);
      const grid = $(".sa-ws");
      grid.addEventListener("pointerdown", (e) => {
        const cell = e.target.closest(".sa-ws__cell"); if (!cell) return;
        e.preventDefault();
        grid.setPointerCapture?.(e.pointerId);
        drag = { r0:Number(cell.dataset.r), c0:Number(cell.dataset.c), coords:[`${cell.dataset.r}-${cell.dataset.c}`] };
        paint(drag.coords);
      });
      grid.addEventListener("pointermove", (e) => {
        if (!drag) return;
        e.preventDefault();
        const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest?.(".sa-ws__cell");
        if (!hit || !grid.contains(hit)) return;
        drag.coords = lineCoords(drag.r0, drag.c0, Number(hit.dataset.r), Number(hit.dataset.c));
        paint(drag.coords);
      });
      const finish = (e) => {
        if (!drag) return;
        e?.preventDefault?.();
        const coords = drag.coords || [];
        const word = wordFrom(coords), rev = word.split("").reverse().join("");
        const match = state.words.find(w => !state.found.has(w) && (w === word || w === rev));
        drag = null; clearSelecting();
        if (match) {
          state.found.add(match); coords.forEach(k => state.foundCells.add(k));
          toast(`${match} encontrada.`, "ok");
          render();
        }
      };
      grid.addEventListener("pointerup", finish);
      grid.addEventListener("pointercancel", () => { drag=null; clearSelecting(); });
      if (state.found.size === state.words.length) {
        $("#saWsReflexao").innerHTML = `
          <div class="sa-recognition mt-20"><p>${esc(cfg.reflexao)}</p></div>
          <button class="btn btn--ghost mt-14" id="saWsAgain">Jogar novamente</button>`;
        $("#saWsAgain").addEventListener("click", () => {
          words = shuffle(cfg.palavras).slice(0, 6);
          state = { grid: saBuildWordSearch(words, 11), words, found: new Set(), foundCells: new Set() };
          render();
        });
      }
    }
    render();
  }

  /* ---- Pote das Coisas Boas ---- */
  function saGamePote() {
    const cfg = D.setembroAmarelo.jogos.poteDasCoisasBoas;

    function render() {
      const pote = store.get("setembroPote", []).slice().reverse();
      openModal(`
        <span class="eyebrow eyebrow--accent">${esc(D.setembroAmarelo.jogos.titulo)}</span>
        <h2 class="h2 mt-10">${esc(cfg.titulo)}</h2>
        <p class="lead mt-10">${esc(cfg.text)}</p>
        <p class="h3 mt-20">${esc(cfg.pergunta)}</p>
        <textarea id="saPoteInput" class="sa-textarea mt-10" rows="3" maxlength="240" placeholder="${esc(cfg.placeholder)}"></textarea>
        <button class="btn btn--yellow mt-14" id="saPoteAdd">${esc(cfg.cta)}</button>
        <div class="sa-pote-list mt-24">
          ${pote.length ? pote.map((p) => `
            <div class="sa-pote-item">
              <span class="sa-pote-item__d">${esc(new Date(p.ts).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }))}</span>
              <p>${esc(p.texto)}</p>
            </div>`).join("") : `<p class="small muted">${esc(cfg.vazio)}</p>`}
        </div>
      `);
      $("#saPoteAdd").addEventListener("click", () => {
        const val = $("#saPoteInput").value.trim();
        if (!val) { toast("Escreva algo antes de guardar."); return; }
        const list = store.get("setembroPote", []);
        list.push({ ts: new Date().toISOString(), texto: val });
        store.set("setembroPote", list);
        toast("Guardado no seu pote.", "ok");
        render();
      });
    }
    render();
  }

  /* ---- Escolha uma Carta ---- */
  function saGameCartas() {
    const cfg = D.setembroAmarelo.jogos.escolhaUmaCarta;
    openModal(`
      <span class="eyebrow eyebrow--accent">${esc(D.setembroAmarelo.jogos.titulo)}</span>
      <h2 class="h2 mt-10">${esc(cfg.titulo)}</h2>
      <p class="lead mt-10">${esc(cfg.intro)}</p>
      <div class="sa-cards mt-20">
        ${cfg.cartas.map((c) => `
          <button class="sa-card-flip" data-carta="${c.categoria}">
            <span class="ico-tile ico-tile--yellow ico-tile--lg">${icon(c.icon)}</span>
            <span>${esc(c.label)}</span>
          </button>`).join("")}
      </div>`);
    $$(".sa-card-flip").forEach((b) => b.addEventListener("click", () => {
      const pool = D.setembroAmarelo.experiencias.filter((e) => e.categoria === b.dataset.carta);
      openExperience(pool[Math.floor(Math.random() * pool.length)].id);
    }));
  }

  /* ---- Roleta. Por Mim Hoje ---- */
  function saGameRoleta() {
    const cfg = D.setembroAmarelo.jogos.roleta;

    function render() {
      const pool = D.setembroAmarelo.experiencias.slice();
      const picks = [];
      while (picks.length < cfg.tamanhoRodada && pool.length) picks.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);

      openModal(`
        <span class="eyebrow eyebrow--accent">${esc(D.setembroAmarelo.jogos.titulo)}</span>
        <h2 class="h2 mt-10">${esc(cfg.titulo)}</h2>
        <p class="lead mt-10">${esc(cfg.intro)}</p>
        <div class="sa-roleta mt-20">
          ${picks.map((e) => `
            <button class="sa-roleta__item" data-exp="${e.id}">
              <span class="ico-tile ico-tile--sm">${icon(e.icon)}</span>
              <span>${esc(e.titulo)}</span>
            </button>`).join("")}
        </div>
        <button class="btn btn--ghost mt-18" id="saRoletaAgain">${icon("shuffle")} Quero outras opções</button>`);
      $$("[data-exp]").forEach((b) => b.addEventListener("click", () => openExperience(b.dataset.exp)));
      $("#saRoletaAgain").addEventListener("click", render);
    }
    render();
  }

  /* ---- Meu Tempo por Mim ---- */
  function mountSaCalendario() {
    const box = $("#saCalendario");
    let view = new Date(); view.setDate(1);

    function render() {
      const momentos = store.get("setembroMomentos", []);
      const byDay = {};
      momentos.forEach((m) => { const k = saDateKey(new Date(m.ts)); (byDay[k] = byDay[k] || []).push(m); });

      const y = view.getFullYear(), mo = view.getMonth();
      const startWeekday = new Date(y, mo, 1).getDay();
      const daysInMonth = new Date(y, mo + 1, 0).getDate();
      const monthLabel = view.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

      let cells = "";
      for (let i = 0; i < startWeekday; i++) cells += `<span class="sa-cal__cell sa-cal__cell--empty"></span>`;
      for (let d = 1; d <= daysInMonth; d++) {
        const k = saDateKey(new Date(y, mo, d));
        const n = (byDay[k] || []).length;
        cells += `<button class="sa-cal__cell${n ? " has-momentos" : ""}" data-day="${k}">
          <span>${d}</span>${n ? `<span class="sa-cal__heart">♥${n > 1 ? n : ""}</span>` : ""}
        </button>`;
      }

      box.innerHTML = `
        ${momentos.length
          ? `<p class="lead sa-cal__summary">♥ ${momentos.length} ${momentos.length === 1 ? "momento por mim" : "momentos por mim"}</p>`
          : `<p class="lead muted">${esc(D.setembroAmarelo.meuTempo.vazio)}</p>`}
        <div class="sa-cal">
          <div class="sa-cal__nav">
            <button class="icon-btn" id="saCalPrev" aria-label="Mês anterior">${icon("arrow", "sa-cal__prev")}</button>
            <b>${esc(monthLabel)}</b>
            <button class="icon-btn" id="saCalNext" aria-label="Próximo mês">${icon("arrow")}</button>
          </div>
          <div class="sa-cal__week">${["D", "S", "T", "Q", "Q", "S", "S"].map((d) => `<span>${d}</span>`).join("")}</div>
          <div class="sa-cal__grid">${cells}</div>
        </div>
        <p class="small muted mt-14">${esc(D.setembroAmarelo.meuTempo.encerramento)}</p>`;

      $("#saCalPrev").addEventListener("click", () => { view.setMonth(view.getMonth() - 1); render(); });
      $("#saCalNext").addEventListener("click", () => { view.setMonth(view.getMonth() + 1); render(); });
      $$("[data-day]", box).forEach((b) => b.addEventListener("click", () => openDia(b.dataset.day, byDay[b.dataset.day] || [])));
    }
    saCalRefresh = render;

    function openDia(key, list) {
      const label = new Date(key + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
      openModal(`
        <span class="eyebrow eyebrow--accent">${esc(label)}</span>
        <h2 class="h2 mt-8">${list.length} ${list.length === 1 ? "momento por mim" : "momentos por mim"}</h2>
        <div class="list-mini mt-20">
          ${list.slice().sort((a, b) => a.ts.localeCompare(b.ts)).map((m) => `
            <div class="list-mini__row" style="cursor:default">
              <span class="ico-tile ico-tile--sm">${icon((D.setembroAmarelo.experiencias.find((e) => e.id === m.id) || {}).icon || "heart")}</span>
              <span>
                <span class="list-mini__t">${esc(saFmtHora(new Date(m.ts)))} · ${esc(m.titulo)}</span>
                <span class="list-mini__m">${m.concluido ? "Concluído" : "Interrompido. e válido do mesmo jeito"}${m.tempoFeito ? " · " + m.tempoFeito + " min" : ""}</span>
              </span>
            </div>`).join("")}
        </div>`);
    }

    render();
  }

  /* ---- Feedback ----
     O HUMAN roda no GitHub Pages, sem servidor próprio: o feedback fica
     salvo só no localStorage deste navegador. Para receber de verdade,
     conecte aqui um serviço como Supabase, Firebase (Firestore),
     Formspree ou Google Sheets/Apps Script, enviando
     { ts, nome, mensagem, publico } por fetch/POST. Comentário marcado
     como público exige moderação antes de ir ao ar. nunca publique
     automaticamente o que chega por aqui. */
  function mountSaFeedback() {
    const form = $("#saFeedbackForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const field = $("#saFbMsg");
      const btn = form.querySelector('button[type="submit"]');
      const msg = field.value.trim();
      if (!msg) { toast("Escreva uma mensagem antes de enviar."); return; }
      if (msg.length > 500) { toast("Sua mensagem pode ter até 500 caracteres."); return; }
      btn.disabled = true;
      btn.textContent = "Enviando...";
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/Mensagens`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_PUBLISHABLE_KEY,
            "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({ Origem: "setembro_amarelo", Mensagem: msg })
        });
        if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
        field.value = "";
        form.hidden = true;
        $("#saFbConfirm").innerHTML = `<div class="sa-recognition mt-20"><p>${esc(D.setembroAmarelo.feedback.confirmacao)}</p></div>`;
      } catch (err) {
        console.error(err);
        toast("Não foi possível enviar agora. Tente novamente em alguns instantes.");
        btn.disabled = false;
        btn.innerHTML = `${icon("send")} ${esc(D.setembroAmarelo.feedback.cta)}`;
      }
    });
  }

  /* ---- view + mount da página ---- */
  function viewSetembro() {
    const SA = D.setembroAmarelo;
    const locked = [
      ["brain","Mente"],["body","Corpo"],["users","Conexões"],["gift","Benefícios"],["cap","Aprender"],["clock","5 minutos para mim"]
    ];
    return `
    <section class="hub-head sa-hero">
      <div class="wrap">
        <div class="hub-head__top">
          <span class="ico-tile ico-tile--xl ico-tile--yellow">${icon("heart")}</span>
          <div>
            <span class="sa-eyebrow">HUMAN | Setembro Amarelo 💛</span>
            <h1 class="h1 mt-6">${esc(SA.entrada.title)}</h1>
            <p class="lead mt-8">${esc(SA.entrada.text)}</p>
          </div>
        </div>
        <p class="sa-impact">Cuidar de você não precisa começar com uma grande mudança.</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="wrap">
        <button class="sa-knowledge" id="saWhy">
          <span>💛</span><span><b>${esc(SA.contexto.title)}</b><small>Toque para conhecer a história e a fonte.</small></span>${arrow()}
        </button>
        <button class="sa-knowledge mt-12" id="saDidYouKnow">
          <span>✨</span><span><b>Você sabia?</b><small>Um conteúdo curto para levar com você hoje.</small></span>${arrow()}
        </button>
      </div>
    </section>

    <section class="section section--tight" id="sa-banco">
      <div class="wrap">
        <div class="block-head"><div><span class="eyebrow">Um tempo para você</span><h2 class="h2 mt-8">Quanto tempo você tem para você hoje?</h2></div></div>
        <div class="tagrow sa-time-only" id="saTimeFilters">${SA.filtrosTempo.map(t => `<button class="chip" data-time="${t.v}">${esc(t.label)}</button>`).join("")}</div>
        <button class="sa-random mt-16" id="saRandom">${icon("shuffle")} Não sei. Escolha por mim.</button>
        <div class="grid grid--3 reveal mt-24" id="saGrid"></div>
        <p class="sa-impact sa-impact--center">Às vezes, cinco minutos já são um começo.</p>
      </div>
    </section>

    <section class="section section--tight section--alt" id="sa-jogos">
      <div class="wrap">
        <div class="block-head"><div><span class="eyebrow">Experimente</span><h2 class="h2 mt-8">Um momento leve também pode ser um momento por você.</h2></div></div>
        <div class="grid grid--4 grid--action reveal">
          <button class="acard" id="saJogoEncontre"><span class="acard__top"><span class="ico-tile ico-tile--lg">${icon("search")}</span></span><span class="acard__t">${esc(SA.jogos.encontreEmVoce.titulo)}</span><span class="acard__d">Encontre palavras ligadas a cuidado, presença e conexão.</span><span class="acard__cta">Jogar ${arrow()}</span></button>
          <button class="acard" id="saJogoPote"><span class="acard__top"><span class="ico-tile ico-tile--lg">${icon("gift")}</span></span><span class="acard__t">${esc(SA.jogos.poteDasCoisasBoas.titulo)}</span><span class="acard__d">Guarde uma pequena coisa boa do seu dia.</span><span class="acard__cta">Abrir ${arrow()}</span></button>
          <button class="acard" id="saJogoCartas"><span class="acard__top"><span class="ico-tile ico-tile--lg">${icon("spark")}</span></span><span class="acard__t">${esc(SA.jogos.escolhaUmaCarta.titulo)}</span><span class="acard__d">Escolha um caminho e receba uma experiência.</span><span class="acard__cta">Escolher ${arrow()}</span></button>
          <button class="acard" id="saJogoRoleta"><span class="acard__top"><span class="ico-tile ico-tile--lg">${icon("shuffle")}</span></span><span class="acard__t">${esc(SA.jogos.roleta.titulo)}</span><span class="acard__d">Deixe a roleta escolher uma possibilidade para agora.</span><span class="acard__cta">Girar ${arrow()}</span></button>
        </div>
      </div>
    </section>

    <section class="section section--tight" id="sa-tempo"><div class="wrap">${blockHead({ label: SA.meuTempo.title, hint: "Se quiser, registre os momentos que reservou para você.", icon: "heart" })}<div id="saCalendario"></div></div></section>

    <section class="section section--tight" id="sa-apoio">
      <div class="wrap">
        <div class="sa-cvv reveal">
          <div><span class="sa-cvv__eyebrow">CANAL EXTERNO DE APOIO</span><h2 class="h2 mt-8">Precisa conversar com alguém?</h2><p class="lead mt-10">${esc(SA.apoio.text)}</p></div>
          <div class="sa-cvv__number"><span>CVV</span><strong>188</strong><small>24 horas, gratuito</small></div>
          <div class="sa-cvv__actions"><a class="btn btn--yellow" href="tel:188">${icon("phone")} Ligar 188</a><a class="btn btn--ghost" href="https://cvv.org.br/" target="_blank" rel="noopener">Acessar CVV</a></div>
        </div>
        <div class="note-line note-line--accent mt-20">${icon("info")}<p>O HUMAN não é um canal de emergência e não substitui atendimento profissional.</p></div>
      </div>
    </section>

    <section class="section section--tight" id="sa-feedback">
      <div class="wrap">
        <div class="recog reveal"><div class="recog__left"><span class="ico-tile ico-tile--xl ico-tile--yellow">${icon("chat")}</span><span class="eyebrow eyebrow--accent mt-16" style="display:block">${esc(SA.feedback.eyebrow)}</span><h2 class="h2 mt-8">${esc(SA.feedback.title)}</h2><p class="lead mt-10">${esc(SA.feedback.text)}</p></div>
          <form class="recog__form" id="saFeedbackForm" novalidate><label class="fld"><span>Mensagem anônima</span><textarea id="saFbMsg" rows="4" placeholder="${esc(SA.feedback.placeholderMsg)}" maxlength="500" required></textarea></label><button class="btn btn--yellow" type="submit">${icon("send")} ${esc(SA.feedback.cta)}</button><p class="fld__note">Este espaço não é um canal de atendimento ou emergência. A mensagem é armazenada anonimamente para demonstrar a funcionalidade deste case.</p></form>
        </div><div id="saFbConfirm"></div>
      </div>
    </section>

    `;
  }

  function mountSetembro() {
    const SA = D.setembroAmarelo;
    let time = null;

    function renderGrid() {
      const list = SA.experiencias.filter(e => !time || e.tempo === time);
      $("#saGrid").innerHTML = list.length ? list.map(saExpCard).join("") : `<div class="empty" style="grid-column:1/-1"><b>Nenhuma experiência nesse tempo.</b>Escolha outro intervalo.</div>`;
      observeReveal();
    }
    $("#saTimeFilters").addEventListener("click", e => {
      const b=e.target.closest("[data-time]"); if(!b) return;
      const v=Number(b.dataset.time); time=time===v?null:v;
      $$("[data-time]", $("#saTimeFilters")).forEach(x=>x.classList.toggle("is-active",Number(x.dataset.time)===time));
      renderGrid();
    });
    $("#saRandom").addEventListener("click", () => {
      const pool=SA.experiencias.filter(e=>!time||e.tempo===time); const p=pool[Math.floor(Math.random()*pool.length)]; if(p) openExperience(p.id);
    });
    $("#saGrid").addEventListener("click", e => { const b=e.target.closest("[data-exp]"); if(b) openExperience(b.dataset.exp); });
    $("#saWhy").addEventListener("click", () => openModal(`<span class="eyebrow eyebrow--accent">Setembro Amarelo</span><h2 class="h2 mt-10">${esc(SA.contexto.title)}</h2><p class="lead mt-12">${esc(SA.contexto.resumo)}</p><p class="sa-impact sa-impact--modal">${esc(SA.contexto.closing)}</p><a class="btn btn--ghost mt-18" href="${SA.contexto.fonteUrl}" target="_blank" rel="noopener">Fonte: ${esc(SA.contexto.fonte)}</a>`));
    $("#saDidYouKnow").addEventListener("click", () => { const x=SA.voceSabia[Math.floor(Math.random()*SA.voceSabia.length)]; openModal(`<span class="eyebrow eyebrow--accent">Você sabia? 💛</span><h2 class="h2 mt-10">${esc(x.titulo)}</h2><p class="lead mt-12">${esc(x.texto)}</p><button class="btn btn--ghost mt-18" id="saAnotherFact">Ver outro</button>`); $("#saAnotherFact")?.addEventListener("click",()=>{$("#saDidYouKnow").click();}); });
    $$("[data-locked]").forEach(b=>b.addEventListener("click",()=>openModal(`<span class="eyebrow eyebrow--accent">HUMAN</span><h2 class="h2 mt-10">Em setembro, o HUMAN está vivendo uma experiência especial. 💛</h2><p class="lead mt-12">Novas áreas estarão disponíveis em breve.</p><button class="btn btn--yellow mt-18" data-close>Continuar no Setembro Amarelo</button>`)));
    renderGrid();
    $("#saJogoEncontre").addEventListener("click", saGameEncontre);
    $("#saJogoPote").addEventListener("click", saGamePote);
    $("#saJogoCartas").addEventListener("click", saGameCartas);
    $("#saJogoRoleta").addEventListener("click", saGameRoleta);
    mountSaCalendario(); mountSaFeedback();
  }

  /* ==================================================================
     12. BUSCA GLOBAL
     ================================================================== */
  const overlay = $("#searchOverlay");
  const searchInput = $("#searchInput");
  const searchResults = $("#searchResults");

  const searchIndex = []
    .concat(Object.keys(ITEMS).map((id) => {
      const it = ITEMS[id];
      return { t: it.title, m: `${it.type}${it.minutes ? " · " + it.minutes + " min" : ""} · ${dimName(it.hub)}`, icon: it.icon,
        hay: it.title + " " + it.text + " " + (it.points || []).join(" "), go: () => openItem(id) };
    }))
    .concat(D.benefits.map((b) => ({ t: b.name, m: `Benefício · ${b.category}`, icon: b.icon,
      hay: b.name + " " + b.short + " " + b.forWhat, go: () => openBenefit(b.id) })))
    .concat(D.dimensions.map((d) => ({ t: d.name, m: `Hub · ${d.tagline}`, icon: d.icon,
      hay: d.name + " " + d.tagline, go: () => { location.hash = d.route || "#/dimensao/" + d.id; } })))
    .concat(D.support.map((s) => ({ t: s.name, m: "Apoio · canal da empresa", icon: s.icon,
      hay: s.name + " " + s.what, go: () => { location.hash = "#/apoio"; } })))
    .concat([{ t: "Especial Setembro Amarelo", m: "Especial · cuidado e autocuidado", icon: "heart",
      hay: "setembro amarelo cuidado autocuidado bem-estar apoio fiz por mim meu tempo por mim", go: () => { location.hash = "#/setembro-amarelo"; } }])
    .concat(D.setembroAmarelo.experiencias.map((e) => ({ t: e.titulo, m: "Setembro Amarelo · " + (D.setembroAmarelo.categorias[e.categoria] || {}).label, icon: e.icon,
      hay: e.titulo + " " + e.texto, go: () => { location.hash = "#/setembro-amarelo"; setTimeout(() => openExperience(e.id), 260); } })));

  let cursor = 0;

  function renderSearch() {
    const q = norm(searchInput.value.trim());
    const items = q ? searchIndex.filter((i) => norm(i.hay).includes(q)).slice(0, 8)
                    : searchIndex.filter((i) => i.m.indexOf("Hub ·") === 0).slice(0, 6);
    cursor = 0;
    searchResults.innerHTML = items.length
      ? items.map((i, k) => `<button class="search-item${k === 0 ? " is-cursor" : ""}" data-k="${k}">
          <span class="ico-tile ico-tile--sm">${icon(i.icon)}</span>
          <span><span class="search-item__t">${esc(i.t)}</span><span class="search-item__m">${esc(i.m)}</span></span></button>`).join("")
      : `<div class="search-empty">Nenhum resultado para “${esc(searchInput.value)}”.</div>`;
    searchResults._items = items;
  }

  function openSearch() {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    searchInput.value = "";
    renderSearch();
    setTimeout(() => searchInput.focus(), 40);
  }
  function closeSearch() {
    overlay.classList.remove("is-open");
    if (!modal.classList.contains("is-open")) document.body.style.overflow = "";
  }

  $("#searchOpen")?.addEventListener("click", openSearch);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeSearch(); });
  searchInput.addEventListener("input", renderSearch);
  searchResults.addEventListener("click", (e) => {
    const b = e.target.closest("[data-k]");
    if (!b) return;
    const item = searchResults._items[Number(b.dataset.k)];
    closeSearch();
    if (item) item.go();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); return; }
    if (e.key === "Escape") { closeSearch(); closeModal(); $("#nav").classList.remove("is-open"); return; }
    if (!overlay.classList.contains("is-open")) return;
    const items = searchResults._items || [];
    if (!items.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      cursor = (cursor + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      $$(".search-item", searchResults).forEach((el, i) => el.classList.toggle("is-cursor", i === cursor));
    }
    if (e.key === "Enter") { e.preventDefault(); closeSearch(); items[cursor].go(); }
  });

  /* ==================================================================
     13. REVEAL
     ================================================================== */
  let io = null;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("is-in")); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -6% 0px", threshold: .05 });
    }
    $$(".reveal:not(.is-in)").forEach((el) => io.observe(el));
  }

  /* ==================================================================
     14. ROTEADOR
     ================================================================== */
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, query] = raw.split("?");
    const parts = path.split("/").filter(Boolean);
    const params = {};
    (query || "").split("&").filter(Boolean).forEach((kv) => {
      const [k, v] = kv.split("=");
      params[k] = decodeURIComponent(v || "");
    });
    return { parts, params };
  }

  function setActiveNav() {
    const h = (location.hash || "#/").split("?")[0];
    $$("#nav a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === h));
  }

  function route() {
    const { parts, params } = parseHash();
    const head = parts[0] || "";
    if (pauseTimer) { clearInterval(pauseTimer); pauseTimer = null; }
    saCalRefresh = null;
    closeModal();
    $("#nav").classList.remove("is-open");
    $("#burger").setAttribute("aria-expanded", "false");

    let mount = null;

    switch (head) {
      case "":
        app.innerHTML = viewSetembro();
        mount = mountSetembro;
        break;
      case "dimensao":
      case "beneficios":
      case "pausa":
      case "apoio":
        location.hash = "#/";
        return;
      case "setembro-amarelo":
        location.hash = "#/";
        return;
      case "case":
        app.innerHTML = viewCase();
        break;
      default:
        location.hash = "#/";
        return;
    }

    if (mount) mount();
    setActiveNav();
    observeReveal();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);

  /* ==================================================================
     15. HEADER
     ================================================================== */
  const header = $("#header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  $("#burger").addEventListener("click", () => {
    const nav = $("#nav");
    const open = nav.classList.toggle("is-open");
    $("#burger").setAttribute("aria-expanded", String(open));
  });
  $("#nav").addEventListener("click", (e) => { if (e.target.tagName === "A") $("#nav").classList.remove("is-open"); });
  $("#savedOpen")?.addEventListener("click", openSavedList);

  // Cards bloqueados no rodapé: mantêm a prévia do HUMAN sem liberar os módulos.
  $$("[data-footer-locked]").forEach((b) => b.addEventListener("click", () => {
    openModal(`<span class="eyebrow eyebrow--accent">HUMAN</span><h2 class="h2 mt-10">Em setembro, o HUMAN está vivendo uma experiência especial. 💛</h2><p class="lead mt-12">Os demais espaços ficam disponíveis em breve.</p><button class="btn btn--yellow mt-18" data-close>Continuar no Setembro Amarelo</button>`);
  }));

  /* ==================================================================
     16. INÍCIO
     ================================================================== */
  paintSavedCount();
  if (!location.hash) location.hash = "#/";
  route();
})();
