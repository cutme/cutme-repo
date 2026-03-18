<!--
  ProjectMo.vue — szczegóły projektu Marketing Opanowany
  Wzorzec do kopiowania przy dodawaniu nowych projektów.

  Props:
    project — obiekt projektu przekazywany przez TheDrawer (z projects.js)
  Emits:
    close   — zamknięcie drawera (przycisk w stopce)
-->
<template>
  <article class="pd">

    <!-- Hero image -->
    <div class="pd__hero">
      <img
        :src="project.image"
        :srcset="project.image2x ? `${project.image} 1x, ${project.image2x} 2x` : undefined"
        :alt="project.imageAlt"
        loading="lazy"
        width="800"
        height="480"
      />
    </div>

    <!-- Skills -->
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <!-- Nagłówek -->
    <header class="pd__header" v-nowidows>
      <h2>Marketing Opanowany</h2>
      <h3>Front-end i wdrożenie WordPress dla agencji - SEO, WCAG, animacje.</h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Klient potrzebował nowoczesnego, responsywnego front-endu dla swojego serwisu
        marketingowego. Strona miała być szybka, SEO-friendly, zgodna z WCAG i łatwa
        do zarządzania w WordPress.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>Kodowanie front-end - Pixel Perfect odwzorowanie grafiki</li>
        <li>Wdrożenie szablonu WordPress (ACF, Custom Post Types)</li>
        <li>Optymalizacja pod SEO i dostępność (WCAG 2.1)</li>
        <li>Responsywność na wszystkich urządzeniach</li>
      </ul>
    </section>

    <!-- CTA -->
    <footer class="pd__footer">
      <a
        :href="project.url"
        class="button pd__see-more"
        target="_blank"
        rel="noopener noreferrer"
      >
        Zobacz online
      </a>
      <button type="button" class="pd__close-btn" @click="$emit('close')">
        Zamknij
      </button>
    </footer>

  </article>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true },
});
defineEmits(['close']);
</script>

<style scoped>
@import '../ProjectDetail.css';
</style>
