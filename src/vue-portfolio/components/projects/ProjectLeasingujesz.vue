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
      <h2>Leasingujesz</h2>
      <h3>
        Front-end dla portalu finansowego - porównywarka ofert leasingowych.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt zakładał stworzenie nowoczesnego i przejrzystego front-endu dla
        portalu umożliwiającego porównywanie ofert leasingowych wielu instytucji
        finansowych. Strona musiała w czytelny sposób prezentować dużą ilość
        informacji oraz ułatwiać użytkownikowi szybkie porównanie dostępnych
        opcji finansowania.
      </p>
      <p>
        Kluczowe było odwzorowanie projektu graficznego z zachowaniem
        przejrzystej struktury layoutu oraz przygotowanie front-endu, który
        umożliwia dalszą rozbudowę portalu o kolejne funkcjonalności i
        integracje z systemami finansowymi.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>Budowa layoutu portalu prezentującego oferty leasingowe</li>
        <li>
          Projekt sekcji porównywania ofert i prezentacji danych finansowych
        </li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>Optymalizacja struktury HTML i CSS pod czytelność i wydajność</li>
        <li>Przygotowanie kodu pod dalszy rozwój funkcjonalności portalu</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstał przejrzysty i funkcjonalny front-end portalu finansowego, który
        umożliwia użytkownikom łatwe porównywanie ofert leasingowych i szybkie
        znalezienie najlepszego rozwiązania finansowego.
      </p>
      <p>
        Struktura strony została zaprojektowana z myślą o czytelnej prezentacji
        danych oraz możliwości dalszej rozbudowy portalu o kolejne sekcje,
        integracje i funkcjonalności.
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
