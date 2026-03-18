<template>
  <Teleport to="body">

    <!-- ── Overlay ─────────────────────────────────────────────────────────── -->
    <Transition name="pf-overlay">
      <div
        v-if="drawer.isOpen"
        class="pf-overlay"
        aria-hidden="true"
        @click="closeWithUrl"
      />
    </Transition>

    <!-- ── Panel ───────────────────────────────────────────────────────────── -->
    <Transition :name="panelTransition">
      <div
        v-if="drawer.isOpen"
        ref="panelRef"
        class="pf-panel"
        :class="`pf-panel--${drawer.side}`"
        role="dialog"
        aria-modal="true"
        :aria-label="drawer.project ? `Szczegóły: ${drawer.project.title}` : 'Panel projektu'"
      >
        <!-- Header -->
        <div class="pf-panel__header">
          <span class="pf-panel__client"><span>Klient:</span> {{ drawer.project?.client }}</span>
          <button
            type="button"
            class="pf-panel__close"
            aria-label="Zamknij panel"
            @click="closeWithUrl"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              <line x1="18" y1="6"  x2="6"  y2="18"/>
              <line x1="6"  y1="6"  x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Body: dynamiczny komponent projektu -->
        <div ref="bodyRef" class="pf-panel__body" tabindex="-1">
          <Suspense>
            <template #default>
              <component
                :is="activeComponent"
                v-if="activeComponent"
                :project="drawer.project"
                @close="close"
              />
            </template>
            <template #fallback>
              <div class="pf-panel__loader" role="status" aria-live="polite">
                <span class="pf-panel__spinner" aria-label="Ładowanie..." />
              </div>
            </template>
          </Suspense>
        </div>

      </div>
    </Transition>

  </Teleport>
</template>

<script setup>
import { computed, defineAsyncComponent, shallowRef, watch, ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useDrawer } from '../composables/useDrawer.js';

const { drawer, close } = useDrawer();
const panelRef = ref(null);
const bodyRef  = ref(null);

// ── Transition name zależy od strony ──────────────────────────────────────
const panelTransition = computed(() =>
  drawer.side === 'left' ? 'pf-slide-left' : 'pf-slide-right'
);

// ── Dynamic component loading ─────────────────────────────────────────────
// Cache: id → defineAsyncComponent — ładujemy raz, później z cache
const _compCache = new Map();

function getAsyncComponent(project) {
  if (_compCache.has(project.id)) return _compCache.get(project.id);
  const comp = defineAsyncComponent({
    loader: project.component,
    timeout: 10_000,
    onError(err, retry, fail, attempts) {
      attempts <= 2 ? retry() : fail();
    },
  });
  _compCache.set(project.id, comp);
  return comp;
}

const activeComponent = shallowRef(null);

watch(
  () => drawer.project?.id,
  (id) => {
    activeComponent.value = id ? getAsyncComponent(drawer.project) : null;
  },
  { immediate: true }
);

// ── Scroll lock + focus trap ──────────────────────────────────────────────
watch(
  () => drawer.isOpen,
  async (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      await nextTick();
      bodyRef.value?.focus();
    }
  }
);

// ── ESC key ───────────────────────────────────────────────────────────────
function onKeydown(e) {
  if (e.key === 'Escape' && drawer.isOpen) closeWithUrl();
}

// ── History API / popstate ────────────────────────────────────────────────
function closeWithUrl() {
  close({ replaceState: true });
}

function onPopState() {
  if (drawer.isOpen) close();
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('popstate', onPopState);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  window.removeEventListener('popstate', onPopState);
  document.body.style.overflow = '';
});
</script>

<style>
@reference "../../styles/styles.css";
/* ── Overlay ──────────────────────────────────────────────────────────────── */
.pf-overlay {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(3px);
  cursor: pointer;
}
.pf-overlay-enter-active,
.pf-overlay-leave-active { transition: opacity 0.3s ease; }
.pf-overlay-enter-from,
.pf-overlay-leave-to     { opacity: 0; }

/* ── Panel ────────────────────────────────────────────────────────────────── */
.pf-panel {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 410;
  display: flex;
  flex-direction: column;
  background: #141414;
  color: #fff;
  box-shadow: 0 0 80px rgba(0,0,0,0.7);
  overflow: hidden;

  @media (min-width: 1024px) {
    width: min(60%, 100vw);
  }
}
.pf-panel--left  { left: 0; right: auto; }
.pf-panel--right { right: 0; left: auto; }

/* Slide from LEFT */
.pf-slide-left-enter-active,
.pf-slide-left-leave-active  { transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.pf-slide-left-enter-from,
.pf-slide-left-leave-to      { transform: translateX(-100%); }

/* Slide from RIGHT */
.pf-slide-right-enter-active,
.pf-slide-right-leave-active { transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.pf-slide-right-enter-from,
.pf-slide-right-leave-to     { transform: translateX(100%); }

/* ── Header ───────────────────────────────────────────────────────────────── */
.pf-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.pf-panel__client {
  @apply clamp-[pl,0,6];
  font-family: var(--font-serif, serif);
  font-size: 1.05rem;
  color: rgba(255,255,255,0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pf-panel__client span {
  @apply opacity-50;
}

.pf-panel__close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}
.pf-panel__close:hover { background: var(--primary-color, #6663ff); }

/* ── Body ─────────────────────────────────────────────────────────────────── */
.pf-panel__body {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 1.5rem;
  outline: none;
}
.pf-panel__body::-webkit-scrollbar       { width: 4px; }
.pf-panel__body::-webkit-scrollbar-track { background: transparent; }
.pf-panel__body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }

/* ── Loader ───────────────────────────────────────────────────────────────── */
.pf-panel__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}
.pf-panel__spinner {
  display: block;
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: var(--primary-color, #6663ff);
  border-radius: 50%;
  animation: pf-spin 0.65s linear infinite;
}
@keyframes pf-spin { to { transform: rotate(360deg); } }
</style>
