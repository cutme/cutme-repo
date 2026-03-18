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
    <header class="pd__header" v-nowidows>
      <h2>DomLux</h2>
      <h3>
        Front-end development dla marki premium - Pixel Perfect, estetyka,
        wydajność.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt strony producenta ekskluzywnych mebli wymagał precyzyjnego
        odwzorowania projektu graficznego z naciskiem na estetykę, minimalizm i
        detale wizualne podkreślające charakter marki premium.
      </p>
      <p>
        Kluczowe było zachowanie wysokiej jakości warstwy wizualnej, płynnych
        przejść oraz pełnej responsywności - szczególnie w kontekście
        prezentacji zdjęć i kompozycji layoutu na różnych rozdzielczościach.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>
          Pełna responsywność (mobile, tablet, desktop, duże rozdzielczości)
        </li>
        <li>Dopracowanie typografii i proporcji layoutu</li>
        <li>Implementacja subtelnych animacji i efektów interakcji</li>
        <li>Optymalizacja wydajności i ładowania obrazów</li>
        <li>Semantyczna struktura HTML i uporządkowany CSS</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstała elegancka, lekka i wizualnie dopracowana strona internetowa,
        która podkreśla ekskluzywny charakter marki oraz jakość oferowanych
        produktów.
      </p>
      <p>
        Projekt został wdrożony z dużą dbałością o detale oraz czystość kodu, co
        zapewnia jego stabilność i gotowość do dalszej rozbudowy.
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
