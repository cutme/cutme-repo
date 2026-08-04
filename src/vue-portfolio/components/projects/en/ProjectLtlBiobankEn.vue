<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>LTL / Biobank</h2>
      <h3>Front-end coding &amp; WordPress implementation for two graphic designs.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The LTL Biobank projects required coding modern, responsive interfaces
        from supplied graphic designs and implementing them as WordPress themes.
        The sites needed to be readable, fast and accessible on all devices,
        while allowing easy content management by the administrator.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <p>
        I was responsible for the front-end layer and WordPress implementation.
        I collaborated with the design team to ensure faithful layout reproduction
        and high code quality.
      </p>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic designs</li>
        <li>Semantic HTML and organised CSS structure</li>
        <li>WordPress themes with editable content areas (ACF)</li>
        <li>GSAP animations and interactive interface elements</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Performance optimisation and clean code</li>
      </ul>
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
