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
    <header class="pd__header">
      <h2>Let's Grow Gdansk</h2>
      <h3>
        Front-end development dla wydarzenia marketingowego - responsywność,
        wydajność, czysty kod.
      </h3>
    </header>

    <!-- Sekcja: Wymagania -->
    <section class="pd__section" v-nowidows>
      <p>
        Projekt realizowany na potrzeby wydarzenia marketingowego organizowanego
        przez agencję Semcore w Gdańsku. Celem było zakodowanie nowoczesnego,
        dynamicznego landing page’a prezentującego społeczność skupioną wokół
        idei Growth Mindset oraz promującego wydarzenie.
      </p>
      <p>
        Strona musiała być w pełni responsywna, lekka i szybka, z naciskiem na
        estetyczne odwzorowanie projektu graficznego oraz dobrą czytelność
        treści na urządzeniach mobilnych.
      </p>
    </section>

    <!-- Sekcja: Zakres prac -->
    <section class="pd__section">
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>Kodowanie front-end - Pixel Perfect odwzorowanie grafiki</li>
        <li>Wdrożenie szablonu WordPress (ACF, Custom Post Types)</li>
        <li>Optymalizacja pod SEO i dostępność (WCAG 2.1)</li>
        <li>Responsywność na wszystkich urządzeniach</li>
      </ul>
    </section>

    <!-- Sekcja: Efekt -->
    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Powstał nowoczesny, dynamiczny landing page skutecznie wspierający komunikację
        wydarzenia oraz budujący profesjonalny wizerunek organizatora.
        Strona jest szybka, lekka i gotowa do dalszej rozbudowy.
      </p>
      <p>
        Projekt został wdrożony z dbałością o detale wizualne oraz czystość kodu,
        co umożliwia jego łatwe utrzymanie i dalszy rozwój.
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
