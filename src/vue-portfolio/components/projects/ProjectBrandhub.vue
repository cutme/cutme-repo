<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{
        skill
      }}</span>
    </div>

    <!-- Nagłówek -->
    <header class="pd__header" v-nowidows>
      <h2>BrandHub</h2>
      <h3>
        Front-end i wdrożenie WordPress dla agencji brandingowej - Pixel
        Perfect, responsywność, animacje.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Klient, agencja brandingowa, potrzebował nowoczesnej, estetycznej strony
        prezentującej swoje projekty. Strona miała wiernie odwzorowywać layout
        graficzny w standardzie Pixel Perfect, być w pełni responsywna, szybka i
        łatwa w zarządzaniu w WordPress.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>Kodowanie front-end z zachowaniem Pixel Perfect</li>
        <li>Wdrożenie szablonu WordPress (ACF, Custom Post Types)</li>
        <li>Optymalizacja pod względem wydajności i szybkości ładowania</li>
        <li>Responsywność na wszystkich urządzeniach</li>
        <li>Integracja animacji i interaktywnych elementów dla lepszego UX</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Strona BrandHub prezentuje projekty agencji w profesjonalny i nowoczesny
        sposób. Każdy element jest dokładnie dopasowany do projektu graficznego,
        a WordPress umożliwia łatwe dodawanie nowych projektów. Strona jest
        szybka, responsywna i gotowa do prezentacji klientom lub wykorzystania w
        działaniach brandingowych.
      </p>
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
import PdHero from '../PdHero.vue';
defineProps({ project: { type: Object, required: true } });
defineEmits(["close"]);
</script>
<style scoped>
@import "../ProjectDetail.css";
</style>
