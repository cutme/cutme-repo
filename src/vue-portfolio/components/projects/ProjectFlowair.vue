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
      <h2>FlowAir</h2>
      <h3>
        Front-end dla strony produktowej - animacje, parallax i interaktywna
        galeria.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <h4>Cel projektu</h4>
      <p>
        Strona została przygotowana jako dynamiczna prezentacja produktu -
        kurtyny powietrznej SLIM firmy FlowAir. Celem projektu było stworzenie
        nowoczesnej i angażującej strony, która w atrakcyjny sposób przedstawi
        funkcjonalność urządzenia oraz jego zastosowanie.
      </p>
      <p>
        Kluczowe było wykorzystanie elementów multimedialnych, takich jak filmy
        poklatkowe, animacje przewijania oraz efekt parallax, które miały
        wizualnie wspierać komunikację produktu. Strona musiała również zachować
        wysoką wydajność oraz płynność działania na różnych urządzeniach.
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
          Integracja filmów poklatkowych prezentujących działanie produktu
        </li>
        <li>Stworzenie dedykowanego skryptu interaktywnej galerii</li>
        <li>Optymalizacja wydajności elementów multimedialnych</li>
        <li>Pełna responsywność (mobile, tablet, desktop)</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstała nowoczesna strona produktowa, która w atrakcyjny i dynamiczny
        sposób prezentuje działanie kurtyny powietrznej SLIM. Wykorzystanie
        animacji, parallaxu oraz materiałów wideo pozwala użytkownikowi lepiej
        zrozumieć funkcjonalność produktu.
      </p>
      <p>
        Projekt łączy estetyczne odwzorowanie projektu graficznego z
        interaktywnym front-endem i zoptymalizowaną wydajnością, dzięki czemu
        strona działa płynnie zarówno na komputerach, jak i urządzeniach
        mobilnych.
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
