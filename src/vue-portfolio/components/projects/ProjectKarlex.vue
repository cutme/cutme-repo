<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{
        skill
      }}</span>
    </div>
    <header class="pd__header">
      <h2>Karlex</h2>
      <h3>
        Front-end development dla firmy doradczej - Pixel Perfect, przejrzysty
        layout, responsywność.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt strony internetowej dla firmy doradczej wymagał zakodowania
        nowoczesnego i przejrzystego layoutu na podstawie projektu graficznego.
        Kluczowe było wierne odwzorowanie kompozycji wizualnej oraz zachowanie
        profesjonalnego charakteru strony, który podkreśla wiarygodność i
        doświadczenie firmy.
      </p>
      <p>
        Strona musiała być w pełni responsywna, czytelna na wszystkich
        urządzeniach oraz zoptymalizowana pod kątem wydajności i przejrzystej
        struktury kodu, co ułatwia jej dalszą rozbudowę i integrację z systemem
        CMS.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>Odwzorowanie układu sekcji i typografii zgodnie z projektem</li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>Optymalizacja struktury HTML i CSS</li>
        <li>Przygotowanie kodu pod dalsze wdrożenie w systemie CMS</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstała przejrzysta i profesjonalna strona internetowa, która w
        czytelny sposób prezentuje ofertę firmy doradczej oraz buduje zaufanie
        potencjalnych klientów.
      </p>
      <p>
        Wdrożenie zostało wykonane z naciskiem na estetykę, czystość kodu oraz
        elastyczną strukturę front-endu, dzięki czemu projekt może być łatwo
        rozwijany i integrowany z kolejnymi funkcjonalnościami.
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
