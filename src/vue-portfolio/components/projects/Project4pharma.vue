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
    <header class="pd__header">
      <h2>4pharma</h2>
      <h3>
        Front-end development dla branży farmaceutycznej - animacje, parallax,
        Pixel Perfect.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt strony internetowej dla agencji doradztwa cyfrowego działającej
        w sektorze farmaceutycznym wymagał nowoczesnego i dynamicznego
        front-endu, który podkreślałby innowacyjny charakter marki oraz
        specjalizację w obsłudze rynku medycznego i farmaceutycznego.
      </p>
      <p>
        Kluczowym elementem było płynne doświadczenie użytkownika, wykorzystanie
        efektów parallax oraz animacji przewijania, które wzbogacają prezentację
        treści i nadają stronie nowoczesny charakter. Jednocześnie ważna była
        wydajność oraz zachowanie przejrzystej struktury kodu umożliwiającej
        dalszą rozbudowę projektu.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>Implementacja efektów parallax i animacji przewijania</li>
        <li>
          Budowa dynamicznych sekcji prezentujących ofertę i kompetencje firmy
        </li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>Optymalizacja wydajności oraz płynności animacji</li>
        <li>Semantyczna struktura HTML i uporządkowany CSS</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstała nowoczesna, dynamiczna strona internetowa, która w atrakcyjny
        wizualnie sposób prezentuje kompetencje firmy działającej w sektorze
        farmaceutycznym i technologicznym.
      </p>
      <p>
        Dzięki zastosowaniu efektów parallax oraz animacji przewijania
        użytkownik otrzymuje płynne i angażujące doświadczenie, a przejrzysta
        struktura kodu umożliwia dalszy rozwój projektu oraz integrację z
        kolejnymi funkcjonalnościami.
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
defineProps({ project: { type: Object, required: true } });
defineEmits(["close"]);
</script>
<style scoped>
@import "../ProjectDetail.css";
</style>
