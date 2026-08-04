<template>
  <div class="pd__hero" :class="{ 'pd__hero--video': hasVideo }">

    <!-- ── WIDEO ─────────────────────────────────────────────────────────── -->
    <template v-if="hasVideo">
      <div
        v-if="loading"
        class="pd__hero-spinner"
        role="status"
        aria-label="Ładowanie wideo..."
        aria-live="polite"
      >
        <span class="pd__hero-spin" aria-hidden="true" />
      </div>

      <video
        ref="videoRef"
        class="pd__hero-video"
        :class="{ 'pd__hero-video--ready': !loading }"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        :aria-label="ariaLabel"
        @loadeddata="onLoaded"
        @canplay="onLoaded"
      >
        <!--
          Dynamiczny MIME type na podstawie rozszerzenia pliku.
          Obsługuje: .mp4, .mov, .webm, .ogg
        -->
        <source :src="project.video" :type="videoMime">
        Twoja przeglądarka nie obsługuje tagu &lt;video&gt;.
      </video>
    </template>

    <!-- ── OBRAZ (fallback gdy brak wideo) ───────────────────────────────── -->
    <img
      v-else
      :src="project.image"
      :srcset="
        project.image2x
          ? `${project.image} 1x, ${project.image2x} 2x`
          : undefined
      "
      :alt="project.imageAlt"
      loading="lazy"
      width="800"
      height="480"
    >

  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';

const props = defineProps({
  project: { type: Object, required: true },
});

const hasVideo = computed(() => !!props.project?.video);
const loading  = ref(true);
const videoRef = ref(null);

// Oblicz poprawny MIME type na podstawie rozszerzenia URL
const videoMime = computed(() => {
  const url = props.project?.video ?? '';
  const ext = url.split('?')[0].split('.').pop().toLowerCase();
  const map = {
    mp4:  'video/mp4',
    mov:  'video/mp4',   // .mov to kontener QuickTime, ale H.264 w środku → video/mp4
    webm: 'video/webm',
    ogg:  'video/ogg',
    ogv:  'video/ogg',
  };
  return map[ext] ?? 'video/mp4';
});

const ariaLabel = computed(() =>
  typeof props.project?.imageAlt === 'object'
    ? (props.project.imageAlt.pl ?? props.project.title)
    : (props.project?.imageAlt ?? props.project?.title ?? '')
);

// Nasłuchuj error na <source> przez natywny event listener
// (Vue @error na <video> nie łapie błędów <source> niezawodnie)
function attachSourceErrorListener() {
  const video = videoRef.value;
  if (!video) return;

  const source = video.querySelector('source');
  if (source) {
    source.addEventListener('error', onVideoError, { once: true });
  }

  // Safety timeout — jeśli po 8s nic się nie stało, ukryj spinner
  setTimeout(() => {
    if (loading.value) {
      console.warn('[PdHero] Timeout ładowania wideo:', props.project?.video);
      loading.value = false;
    }
  }, 8000);
}

onMounted(() => {
  if (hasVideo.value) {
    nextTick(attachSourceErrorListener);
  }
});

// Reset przy zmianie projektu w drawerze
watch(
  () => props.project?.id,
  () => {
    loading.value = true;

    if (hasVideo.value) {
      nextTick(() => {
        if (videoRef.value) {
          videoRef.value.load();
          attachSourceErrorListener();
        }
      });
    }
  }
);

function onLoaded() {
  loading.value = false;
}

function onVideoError() {
  loading.value = false;
  console.warn('[PdHero] Błąd ładowania wideo:', props.project?.video);
}
</script>

<style scoped>
/* ── Hero wrapper ────────────────────────────────────────────────────────── */
.pd__hero {
  position: relative;
  line-height: 0;
}

.pd__hero--video {
  /* aspect-ratio: 5 / 3; */
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-2xl, 1rem);
  overflow: hidden;
}

/* ── Obraz ───────────────────────────────────────────────────────────────── */
.pd__hero img {
  width: 100%;
  border-radius: var(--radius-2xl, 1rem);
}

/* ── Wideo ───────────────────────────────────────────────────────────────── */
.pd__hero-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.pd__hero-video--ready {
  opacity: 1;
}

/* ── Spinner ─────────────────────────────────────────────────────────────── */
.pd__hero-spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.pd__hero-spin {
  display: block;
  width: 36px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-top-color: var(--primary-color, #6663ff);
  border-radius: 50%;
  animation: pd-hero-spin 0.7s linear infinite;
}

@keyframes pd-hero-spin {
  to { transform: rotate(360deg); }
}
</style>
