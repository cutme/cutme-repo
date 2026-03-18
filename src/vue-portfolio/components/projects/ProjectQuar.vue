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
      <h2>Quar Studio</h2>
      <h3>
        Front-end i wdrożenie WordPress dla portfolio grafika UX/UI - Pixel
        Perfect, responsywność, estetyka.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Klient chciał portfolio prezentujące jego projekty UX/UI w sposób
        nowoczesny i atrakcyjny wizualnie. Strona musiała odwzorowywać każdy
        szczegół projektu graficznego, być w pełni responsywna, szybka i łatwa w
        zarządzaniu w WordPress.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>Kodowanie front-end zgodnie z projektem UX/UI - Pixel Perfect</li>
        <li>
          Wdrożenie portfolio w WordPress z użyciem ACF i Custom Post Types
        </li>
        <li>Optymalizacja pod względem wydajności i szybkości ładowania</li>
        <li>Responsywność na wszystkich urządzeniach i ekranach</li>
        <li>Integracja animacji i interaktywnych elementów dla lepszego UX</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Strona portfolio Quar Studio prezentuje projekty w estetyczny i
        profesjonalny sposób. Każdy element jest dopracowany wizualnie, a
        WordPress pozwala na łatwe dodawanie nowych projektów. Strona jest
        szybka, responsywna i gotowa do prezentacji klientom lub współpracy z
        agencjami.
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
