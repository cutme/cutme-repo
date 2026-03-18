<template>
  <section
    id="portfolio"
    class="relative z-10 clamp-[pt,8,40] bg-black/40"
    aria-label="Portfolio projektów"
  >
  <!-- <h2 class="clamp-[mb,8,16] clamp-[text,3xl,5xl] font-serif text-white text-center">Portfolio</h2> -->

  <header class="text-center clamp-[mb,6,16] flex flex-col clamp-[gap,1,2]">
    <h2 class=" clamp-[text,3xl,5xl] font-serif text-white ">Portfolio</h2>
    <p class="text-white clamp-[text,base,xl] opacity-30">Front-end &amp; WordPress</p>
  </header>

    <!-- ── Mobile: Swiper karuzela ──────────────────────────────────────── -->
    <Swiper
      v-if="isMobile"
      :slides-per-view="1"
      :centered-slides="true"
      :space-between="24"
      :pagination="{ clickable: true }"
      :modules="swiperModules"
      :speed="600"
      class="pf-swiper"
    >
      <SwiperSlide
        v-for="project in currentProjects"
        :key="project.id"
        class="pf-swiper__slide"
      >
        <ProjectCard :project="project" />
      </SwiperSlide>
    </Swiper>

    <!-- ── Desktop: oryginalny grid ────────────────────────────────────── -->
    <div
      v-else
      class="pf-grid container"
    >
      <ProjectCard
        v-for="project in currentProjects"
        :key="project.id"
        :project="project"
        class="pf-grid__item"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { projects, projects_en } from '../projects.js';
import ProjectCard from '../components/ProjectCard.vue';

// Język
const isEn = window.location.pathname.startsWith('/en');
const currentProjects = isEn ? projects_en : projects;

// Moduły Swiper
const swiperModules = [Pagination];

// Breakpoint – reaktywny
const BREAKPOINT = 1024;
const isMobile = ref(window.innerWidth <= BREAKPOINT);

function onResize() {
  isMobile.value = window.innerWidth <= BREAKPOINT;
}

onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));
</script>

<style scoped>
@reference "../../styles/styles.css";

/* ── Sekcja wrapper ─────────────────────────────────────────────────────── */

/* ── Desktop grid (identyczny z poprzednim) ─────────────────────────────── */
.pf-grid {
  @apply grid lg:grid-cols-2;
}

/* ── Swiper wrapper ─────────────────────────────────────────────────────── */
.pf-swiper {
  width: 100%;
  padding-bottom: 48px !important; /* miejsce na paginację */
}

/* ── Pojedynczy slide ───────────────────────────────────────────────────── */
.pf-swiper__slide {
  display: flex;
  align-items: stretch;
  /* Wyrównana wysokość wszystkich slajdów */
  height: auto;
}

/* Karta wypełnia cały slide */
.pf-swiper__slide :deep(.pf-card) {
  width: 100%;
  /* Stała wysokość dla spójności karuzeli */
  min-height: 420px;
}

/* Obrazy rozciągają się na pełną wysokość karty */
.pf-swiper__slide :deep(.pf-card__picture img) {
  height: 100%;
  min-height: 420px;
  object-fit: cover;
}

/* ── Paginacja – kolor primary ──────────────────────────────────────────── */
.pf-swiper :deep(.swiper-pagination-bullet) {
  background: var(--color-primary);
  opacity: 0.35;
}
.pf-swiper :deep(.swiper-pagination-bullet-active) {
  background: var(--color-primary);
  opacity: 1;
}
</style>
