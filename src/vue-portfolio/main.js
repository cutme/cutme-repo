/**
 * main.js — entry point mini-aplikacji Vue portfolio
 * Montuje się na <div id="portfolio-app">
 * Izolowany od reszty strony — zero wspólnych zależności z app.js
 *
 * Obsługuje dwa tryby:
 * 1. Strona główna (index.html) — montuje grid/swiper portfolio
 * 2. Strona projektu (/portfolio/<slug>/) — zawiera statyczny HTML SEO,
 *    Vue otwiera drawer dla danego projektu po załadowaniu.
 */
import { createApp } from 'vue';
import App from './App.vue';
import nowidows from './directives/nowidows';
import { projects, projects_en } from './projects.js';
import { useDrawer } from './composables/useDrawer.js';

const el = document.getElementById('portfolio-app');

if (el) {
  const projectIdToOpen = el.dataset.openProject;

  if (projectIdToOpen) {
    // ── Tryb strony projektu ────────────────────────────────────────────────
    // Statyczna treść SEO już jest w DOM — nie czyścimy jej.
    // Vue montuje się na nowym elemencie żeby obsłużyć drawer.
    const mountEl = document.createElement('div');
    mountEl.id = 'portfolio-vue-mount';
    document.body.appendChild(mountEl);

    const app = createApp(App);
    app.directive('nowidows', nowidows);
    app.mount(mountEl);

    // Otwórz drawer dla projektu pasującego do data-open-project
    const isEn  = window.location.pathname.startsWith('/en');
    const list  = isEn ? projects_en : projects;
    const project = list.find(p => p.id === projectIdToOpen);

    if (project) {
      const { open } = useDrawer();
      // Czekamy jeden tick — TheDrawer musi się zamontować w nowym elemencie
      setTimeout(() => open(project, { pushState: false }), 50);
    }
  } else {
    // ── Tryb strony głównej ─────────────────────────────────────────────────
    // Usuń prerendered SEO HTML, zamontuj interaktywne portfolio grid/swiper
    el.innerHTML = '';
    const app = createApp(App);
    app.directive('nowidows', nowidows);
    app.mount(el);
  }
} else {
  console.warn('[vue-portfolio] Brak elementu #portfolio-app w DOM');
}
