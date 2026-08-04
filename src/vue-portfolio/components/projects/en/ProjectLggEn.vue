<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>Let's Grow Gdańsk</h2>
      <h3>Front-end for a marketing event – responsive, performant, clean code.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        A landing page built for a marketing event organised by Semcore agency
        in Gdańsk. The goal was a modern, dynamic page showcasing the Growth
        Mindset community and promoting the event.
      </p>
      <p>
        The site had to be fully responsive, lightweight and fast, with an
        accurate reproduction of the graphic design and excellent readability
        on mobile devices.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>GSAP scroll animations and interactive elements</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Performance optimisation and clean code structure</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A modern, dynamic landing page that effectively supports event
        communication and builds a professional image for the organiser.
        Fast, lightweight and ready for further development.
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
