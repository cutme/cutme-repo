<template>
  <div
    class="pf-card"
    :class="{ 'pf-card--active': isActive }"
    role="button"
    tabindex="0"
    :aria-label="`Otwórz szczegóły projektu: ${project.title}`"
    itemscope
    itemtype="https://schema.org/CreativeWork"
    @click="handleOpen"
    @keydown.enter.prevent="handleOpen"
    @keydown.space.prevent="handleOpen"
  >
    <!-- Dekoracja narożnikowa (zachowana z oryginalnego projektu) -->
    <div class="pf-card__corner" aria-hidden="true">
      <b></b>
    </div>

    <!-- Obraz -->
    <picture class="pf-card__picture">
      <img
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
        itemprop="image"
      />
    </picture>

    <!-- Gradient overlay -->
    <div class="pf-card__gradient" aria-hidden="true" />

    <!-- Treść -->
    <article class="pf-card__body" v-nowidows>
      <!--
        SEO anchor: widoczny dla Googlebota, niewidoczny wizualnie.
        Obejmuje h3 i opis — daje Google link + tytuł + treść projektu.
        tabindex="-1" żeby nie duplikować focusu (karta ma już role=button).
      -->
      <a
        :href="portfolioUrl"
        class="pf-card__seo-link"
        tabindex="-1"
        @click.prevent
      >
        <h3 class="pf-card__title" itemprop="name">{{ project.title }}</h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p
          class="pf-card__desc"
          itemprop="description"
          v-html="project.shortDesc"
        />
      </a>
      <span class="button pf-card__cta">{{
        isEn ? "Read more" : "Czytaj więcej"
      }}</span>
    </article>

    <!-- Skill tags -->
    <div
      v-if="project.skills?.length"
      class="pf-card__skills"
      aria-hidden="true"
    >
      <span v-for="skill in project.skills" :key="skill" class="skill">{{
        skill
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDrawer } from "../composables/useDrawer.js";

const props = defineProps({
  project: { type: Object, required: true },
});

const { drawer, open } = useDrawer();

const isEn = window.location.pathname.startsWith("/en");

const isActive = computed(
  () => drawer.isOpen && drawer.project?.id === props.project.id,
);

const portfolioUrl = computed(() => {
  const slug = props.project.slug || props.project.id;
  const isEn = window.location.pathname.startsWith("/en");
  return isEn ? `/en/portfolio/${slug}` : `/portfolio/${slug}`;
});

function handleOpen() {
  open(props.project);
}
</script>

<style scoped>
@reference "../../styles/styles.css";

/* ── Wrapper ────────────────────────────────────────────────────────────────── */
.pf-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  transition:
    transform 0.25s ease,
    border-radius 0.25s ease;

  @media (max-width: 1024px) {
    @apply rounded-3xl max-h-[80vh] max-w-[90vw] mx-auto;
  }
}
.pf-card:focus-visible {
  outline: 2px solid var(--primary-color, #6663ff);
  outline-offset: 2px;
}

/* ── Corner decoration (mirrored from original .o-corner CSS) ─────────────── */
.pf-card__corner {
  @apply absolute bottom-0 right-0 z-10 size-[60px] bg-black duration-500;
  transform: translate3d(100%, 100%, 0);
  border-top-left-radius: calc(50% + 5px);
}
.pf-card__corner::before,
.pf-card__corner::after {
  @apply absolute size-6 content-[''];
  box-shadow: 5px 5px 0 0 black;
}
.pf-card__corner::before {
  @apply top-0 right-0 -translate-y-full;
  border-bottom-right-radius: calc(50% + 5px);
}
.pf-card__corner::after {
  @apply top-auto left-0 bottom-0 -translate-x-full;
  border-bottom-right-radius: calc(50% + 5px);
}

.pf-card__corner b {
  @apply absolute right-0 bottom-0 size-12 rounded-full;
}
.pf-card__corner b::before {
  @apply flex absolute top-0 justify-center items-center size-full 
         text-white font-icons text-2xl font-light transition content-['\e911'] duration-700;
  transform: rotate(90deg);
}

/* ── Image ──────────────────────────────────────────────────────────────────── */
.pf-card__picture {
  display: block;

  @media (max-width: 1024px) {
    @apply h-full;
  }
}
.pf-card__picture img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition:
    opacity 1s,
    transform 1s;
  backface-visibility: hidden;

  @media (max-width: 1024px) {
    @apply object-cover size-full;
    /* min-height: 400px; */
    /* opacity: .8; */
  }
}

/* ── Gradient ────────────────────────────────────────────────────────────────── */
.pf-card__gradient {
  @apply absolute inset-0 pointer-events-none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  transition: opacity 0.4s ease;

  @media (min-width: 1024px) {
    @apply opacity-0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }
}

/* ── Body ────────────────────────────────────────────────────────────────────── */
.pf-card__body {
  @apply px-6 py-8;
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 90%;
  color: #fff;
}
@media (min-width: 768px) {
  .pf-card__body {
    max-width: 80%;
  }
}

/* ── SEO link (wrapper na h3 + desc, niewidoczny wizualnie) ─────────────────── */
.pf-card__seo-link {
  display: contents; /* nie zaburza layoutu flexbox pf-card__body */
  color: inherit;
  text-decoration: none;
}

.pf-card__title {
  margin-bottom: 0.5rem;
  font-family: var(--font-serif, serif);
  font-size: clamp(1.875rem, 2vw + 1rem, 3rem);
  white-space: nowrap;

  @media (min-width: 1024px) {
    transform: translate3d(-640px, 0, 0);
    opacity: 0;
    transition:
      opacity 0.35s,
      transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) 0.15s;
  }
}
.pf-card__desc {
  @apply font-light mb-4 overflow-hidden clamp-[text,base,lg];
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (min-width: 1024px) {
    opacity: 0;
    transform: translate3d(-640px, 0, 0);
    transition:
      opacity 0.35s,
      transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) 0.25s;
  }
}
.pf-card__cta {
  @apply px-4 py-2 text-sm;
  align-self: flex-start;

  @media (min-width: 1024px) {
    opacity: 0;
    transform: translate3d(-640px, 0, 0);
    transition:
      opacity 0.35s,
      transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) 0.35s;
  }
}

/* ── Skill tags ──────────────────────────────────────────────────────────────── */
.pf-card__skills {
  @apply absolute top-4 right-4 z-10 flex opacity-0 flex-wrap justify-end gap-1.5;

  @media (min-width: 1024px) {
    transform: translateY(-6px);
    transition:
      opacity 0.3s 0.2s,
      transform 0.3s 0.2s;
  }
}

.pf-card__skills .skill {
  @apply border-none bg-black/50;
}

/* ── Hover (desktop) ─────────────────────────────────────────────────────────── */

@media (hover: hover) and (min-width: 1024px) {
  .pf-card:hover {
    transform: scale3d(0.99, 0.99, 1);
    border-radius: 24px;
  }
  .pf-card:hover .pf-card__corner {
    transform: translate3d(0, 0, 0);
  }
  .pf-card:hover .pf-card__corner b::before {
    transform: rotate(-90deg);
  }
  .pf-card:hover .pf-card__picture img {
    opacity: 0.4;
    transform: scale3d(1.08, 1.08, 1);
  }
  .pf-card:hover .pf-card__gradient {
    opacity: 1;
  }
  .pf-card:hover .pf-card__title,
  .pf-card:hover .pf-card__desc,
  .pf-card:hover .pf-card__cta {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .pf-card:hover .pf-card__skills {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Touch (zawsze widoczny tekst) ───────────────────────────────────────────── */
@media (hover: none) {
  .pf-card__gradient {
    opacity: 1;
  }
  .pf-card__title,
  .pf-card__desc,
  .pf-card__cta {
    opacity: 1;
    transform: none;
  }
}

/* ── Active state ────────────────────────────────────────────────────────────── */
.pf-card--active {
  outline: 2px solid var(--primary-color, #6663ff);
  outline-offset: -2px;
  border-radius: 8px;
}
</style>
