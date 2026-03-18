/**
 * useDrawer.js
 * Composable-singleton zarządzający stanem Drawera.
 * Obsługuje History API – otwieranie projektu aktualizuje URL:
 *   /portfolio/brandhub  →  wysuwa drawer BrandHub
 *   Wstecz/Naprzód przeglądarki → zamyka/otwiera drawer
 *
 * Singleton: reactive() POZA funkcją = jeden obiekt dla całej app.
 */
import { reactive, readonly } from 'vue';

// ── singleton state ──────────────────────────────────────────────────────────
const _state = reactive({
  isOpen:  false,
  project: null,     // obiekt z projects.js lub null
  side:    'right',  // 'left' | 'right'
});

let _closeTimer = null;

// Bazowa ścieżka zależna od języka
function _basePath() {
  return window.location.pathname.startsWith('/en') ? '/en/portfolio/' : '/portfolio/';
}

function open(project, { pushState = true } = {}) {
  // Ten sam projekt kliknięty ponownie → ignoruj
  if (_state.isOpen && _state.project?.id === project.id) return;
  clearTimeout(_closeTimer);
  _state.project = project;
  _state.side    = project.drawerSide ?? 'right';
  _state.isOpen  = true;

  if (pushState) {
    const slug = project.slug || project.id;
    const url  = _basePath() + slug;
    window.history.pushState({ portfolioId: project.id }, project.title, url);
  }
}

function close({ replaceState = false } = {}) {
  _state.isOpen = false;
  _closeTimer = setTimeout(() => {
    if (!_state.isOpen) _state.project = null;
  }, 360);

  // Przywróć bazowy URL po zamknięciu
  if (replaceState) {
    const base = window.location.pathname.startsWith('/en') ? '/en/' : '/';
    window.history.pushState(null, '', base);
  }
}

// ── publiczny interfejs ──────────────────────────────────────────────────────
export function useDrawer() {
  return {
    drawer: readonly(_state),
    open,
    close,
  };
}
