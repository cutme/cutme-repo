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
      <h2>126 marek</h2>
      <h3>
        Semantyczny front-end i animacje dla serwisu prezentującego marki.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Projekt obejmował zakodowanie strony internetowej prezentującej
        różnorodne marki w przejrzystej i nowoczesnej formie wizualnej. Kluczowe
        było przygotowanie semantycznej struktury HTML, która zapewni dobrą
        czytelność kodu, poprawną indeksację przez wyszukiwarki oraz łatwość
        dalszego rozwijania projektu.
      </p>
      <p>
        Istotnym elementem realizacji było również wprowadzenie subtelnych
        animacji, które wzbogacają interakcję użytkownika ze stroną i nadają
        serwisowi dynamiczny charakter, zachowując przy tym wysoką wydajność
        działania.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section" v-nowidows>
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>
          Kodowanie front-end na podstawie projektu graficznego (Pixel Perfect)
        </li>
        <li>Przygotowanie semantycznej struktury HTML</li>
        <li>Implementacja animacji i efektów interakcji</li>
        <li>Optymalizacja struktury kodu pod SEO</li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
        <li>Uporządkowana i czytelna architektura HTML, CSS i JavaScript</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstał nowoczesny i lekki front-end, który prezentuje marki w
        atrakcyjnej wizualnie formie, jednocześnie zachowując przejrzystość
        struktury oraz wysoką wydajność strony.
      </p>
      <p>
        Dzięki semantycznemu kodowi i dobrze zorganizowanej architekturze
        projektu strona jest łatwa w dalszym rozwijaniu oraz integracji z
        systemami CMS lub dodatkowymi funkcjonalnościami.
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
