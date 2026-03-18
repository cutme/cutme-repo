<template>
  <article class="pd">
    <div class="pd__hero">
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
      >
    </div>
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{
        skill
      }}</span>
    </div>

    <!-- Nagłówek -->
    <header class="pd__header" v-nowidows>
      <h2>LTL / Biobank</h2>
      <h3>
        Kodowanie front-end i wdrożenie WordPress dla firmy logistycznej.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekty LTL Biobank wymagały zakodowania nowoczesnego, responsywnego
        interfejsu na podstawie dostarczonych projektów graficznych oraz
        wdrożenia ich jako motywy WordPress. Strony musiały być czytelne,
        szybkie i dostępne na wszystkich urządzeniach, a jednocześnie umożliwiać
        łatwe zarządzanie treścią przez administratora.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <p>
        Odpowiadałem za przygotowanie warstwy front-end oraz wdrożenie projektu
        do systemu WordPress. Współpracowałem z zespołem projektowym, dbając o
        wierne odwzorowanie layoutu oraz wysoką jakość kodu.
      </p>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektów graficznych (Pixel Perfect)
        </li>
        <li>Semantyczny HTML i uporządkowana struktura CSS</li>
        <li>Wdrożenie motywów WordPress z możliwością edycji treści</li>
        <li>Implementacja animacji i interaktywnych elementów interfejsu</li>
        <li>Pełna responsywność - mobile, tablet i desktop</li>
        <li>Optymalizacja wydajności i czytelności kodu</li>
      </ul>
    </section>

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
defineProps({ project: { type: Object, required: true } });
defineEmits(["close"]);
</script>
<style scoped>
@import "../ProjectDetail.css";
</style>
