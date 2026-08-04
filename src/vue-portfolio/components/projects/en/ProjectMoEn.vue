<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>Marketing Opanowany</h2>
      <h3>Front-end &amp; WordPress implementation – SEO, WCAG, animations.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The client needed a modern, responsive front-end for their marketing
        platform. The site had to be fast, SEO-friendly, WCAG-compliant and
        easy to manage inside WordPress.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from Figma design</li>
        <li>WordPress theme implementation (ACF, Custom Post Types)</li>
        <li>SEO optimisation &amp; accessibility (WCAG 2.1)</li>
        <li>Full responsiveness across all devices</li>
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
