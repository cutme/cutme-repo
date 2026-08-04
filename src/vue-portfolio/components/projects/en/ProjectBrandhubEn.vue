<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>BrandHub</h2>
      <h3>Front-end for a branding agency – Pixel Perfect, responsiveness, animations.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The client, a branding agency, needed a modern, aesthetic website to
        showcase their projects. The site needed to faithfully reproduce the
        graphic layout in Pixel Perfect standard, be fully responsive, fast
        and easy to manage in WordPress.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding</li>
        <li>WordPress theme implementation (ACF, Custom Post Types)</li>
        <li>Performance and loading speed optimisation</li>
        <li>Full responsiveness across all devices</li>
        <li>CSS animations and interactive elements for better UX</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        The BrandHub website presents the agency's projects in a professional
        and modern way. Every element is precisely matched to the graphic design,
        and WordPress makes it easy to add new work. The site is fast, responsive
        and ready for client presentations or use in branding activities.
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
