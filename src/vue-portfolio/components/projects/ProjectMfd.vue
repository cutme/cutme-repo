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
      <h2>MFD</h2>
      <h3>
        Front-end i wdrożenie WordPress dla startupu technologicznego - animacje
        GSAP, responsywność.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt strony dla startupu działającego w sektorze wagonów kolejowych
        wymagał nowoczesnej i dynamicznej prezentacji technologicznego
        charakteru firmy. Kluczowe było zakodowanie projektu graficznego oraz
        wdrożenie strony w systemie WordPress, który umożliwia łatwe zarządzanie
        treścią przez zespół klienta.
      </p>
      <p>
        Strona miała wyróżniać się wizualnie poprzez animacje i płynne przejścia
        sekcji, jednocześnie zachowując wysoką wydajność, responsywność oraz
        przejrzystą strukturę kodu.
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
        <li>Implementacja animacji i interakcji z wykorzystaniem GSAP</li>
        <li>
          Budowa dynamicznych sekcji prezentujących ofertę i technologię firmy
        </li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>
          Optymalizacja wydajności oraz organizacja struktury HTML, CSS i JS
        </li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstała nowoczesna i dynamiczna strona internetowa, która w atrakcyjny
        sposób prezentuje działalność startupu oraz jego innowacyjne podejście
        do branży kolejowej.
      </p>
      <p>
        Dzięki animacjom GSAP oraz dopracowanemu front-endowi projekt oferuje
        płynne i angażujące doświadczenie użytkownika, a jednocześnie pozostaje
        łatwy w zarządzaniu dzięki wdrożeniu w systemie WordPress.
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
