<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>Metoda Tęczówki</h2>
      <h3>Advanced front-end animations – CSS Awards distinction.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The project required a modern website in which the visual layer and
        user interactions played the central role. The layout needed a very
        precise reproduction of the graphic design and dynamic animations that
        reinforce the character of the site.
      </p>
      <p>
        Combining the design's aesthetics with high front-end performance was
        essential. The site needed to run smoothly across devices and browsers
        while remaining lightweight and clean in its code.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>GSAP animations and user interaction effects</li>
        <li>Animation smoothness and performance optimisation</li>
        <li>Semantic HTML structure</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Clean and well-structured CSS and JavaScript</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A modern, dynamic website in which animations are an integral part of
        the user experience and reflect the character of the project.
      </p>
      <p>
        The quality of execution and polished visual effects were recognised by
        the industry – the project received a distinction from CSS Awards, one
        of the most recognised competitions for websites.
      </p>
    </section>

    <footer class="pd__footer">
      <a
        :href="project.url"
        class="button pd__see-more"
        target="_blank"
        rel="noopener noreferrer"
      >
        View live
      </a>
      <button type="button" class="pd__close-btn" @click="$emit('close')">
        Close
      </button>
    </footer>
  </article>
</template>

<script setup>
import PdHero from '../../PdHero.vue';
defineProps({ project: { type: Object, required: true } });
defineEmits(['close']);
</script>

<style scoped>
@import '../../ProjectDetail.css';
</style>
