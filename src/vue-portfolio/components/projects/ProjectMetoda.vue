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
      <h2>Metoda Tęczówki</h2>
      <h3>Zaawansowane animacje front-end i wyróżnienie w CSS Awards.</h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt zakładał stworzenie nowoczesnej strony internetowej, w której
        kluczową rolę odgrywa warstwa wizualna i interakcje użytkownika ze
        stroną. Layout wymagał bardzo precyzyjnego odwzorowania projektu
        graficznego oraz zastosowania dynamicznych animacji podkreślających
        charakter serwisu.
      </p>
      <p>
        Ważnym elementem realizacji było połączenie estetyki projektu z wysoką
        wydajnością front-endu. Strona miała działać płynnie na różnych
        urządzeniach i przeglądarkach, zachowując jednocześnie lekkość i
        przejrzystość kodu.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>Implementacja animacji i efektów interakcji użytkownika</li>
        <li>Optymalizacja płynności animacji i wydajności strony</li>
        <li>Przygotowanie semantycznej struktury HTML</li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>Dbałość o czytelność i strukturę kodu CSS oraz JavaScript</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstała nowoczesna i dynamiczna strona internetowa, w której animacje
        stanowią integralną część doświadczenia użytkownika i podkreślają
        charakter projektu.
      </p>
      <p>
        Jakość wykonania oraz dopracowane efekty wizualne zostały docenione
        przez branżę - projekt otrzymał wyróżnienie w CSS Awards, jednym z
        najbardziej rozpoznawalnych konkursów dla stron internetowych.
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
