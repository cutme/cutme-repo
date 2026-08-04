<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>Karlex</h2>
      <h3>Front-end for a consulting firm – Pixel Perfect, clean layout, responsiveness.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        A website for a consulting company required coding a modern, clear
        layout from a graphic design. The key requirement was faithful
        reproduction of the visual composition while maintaining a professional
        look that reinforces credibility and the firm's expertise.
      </p>
      <p>
        The site needed to be fully responsive, readable on all devices and
        optimised for performance and clean code structure to allow easy future
        expansion and CMS integration.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>Section layout and typography reproduced to spec</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>HTML and CSS structure optimisation</li>
        <li>Code prepared for CMS integration</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A clear, professional website that effectively presents the consulting
        firm's offer and builds trust with potential clients.
      </p>
      <p>
        Delivered with a focus on aesthetics, code cleanliness and a flexible
        front-end architecture, making the project easy to extend and integrate
        with further functionality.
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
