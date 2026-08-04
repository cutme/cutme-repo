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
      <h2>FT Fund</h2>
      <h3>
        Front-end i wdrożenie WordPress dla landing page firmy finansowej.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt obejmował stworzenie nowoczesnego landing page dla firmy
        działającej w sektorze finansowym. Strona miała w przejrzysty sposób
        prezentować ofertę pożyczkową oraz prowadzić użytkownika przez kluczowe
        informacje dotyczące produktu finansowego.
      </p>
      <p>
        Istotne było dokładne odwzorowanie projektu graficznego oraz wdrożenie
        strony w systemie WordPress, aby umożliwić klientowi samodzielne
        zarządzanie treścią i łatwą rozbudowę w przyszłości. Ważnym elementem
        była również optymalizacja pod kątem SEO oraz poprawna struktura kodu.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>Wdrożenie szablonu WordPress</li>
        <li>Budowa struktury landing page prezentującej ofertę finansową</li>
        <li>Optymalizacja struktury HTML pod SEO</li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>Uporządkowanie kodu i przygotowanie pod dalszy rozwój strony</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstał przejrzysty i nowoczesny landing page, który w czytelny sposób
        prezentuje ofertę firmy finansowej oraz prowadzi użytkownika przez
        kolejne sekcje strony.
      </p>
      <p>
        Dzięki wdrożeniu w systemie WordPress strona może być łatwo zarządzana i
        rozwijana przez zespół klienta, a zoptymalizowana struktura kodu sprzyja
        dobrej widoczności w wyszukiwarkach.
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
