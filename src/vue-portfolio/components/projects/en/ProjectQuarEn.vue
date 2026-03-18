<template>
  <article class="pd">
    <div class="pd__hero">
      <img
        :src="project.image"
        :srcset="project.image2x ? `${project.image} 1x, ${project.image2x} 2x` : undefined"
        :alt="project.imageAlt"
        loading="lazy"
        width="800"
        height="480"
      >
    </div>
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>Quar Studio</h2>
      <h3>Front-end &amp; WordPress portfolio for a UX/UI designer – Pixel Perfect, aesthetics.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The client wanted a portfolio that presents their UX/UI projects in a
        modern and visually attractive way. The site needed to reproduce every
        detail of the graphic design, be fully responsive, fast and easy to
        manage in WordPress.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from UX/UI design</li>
        <li>WordPress portfolio implementation with ACF and Custom Post Types</li>
        <li>Performance and loading speed optimisation</li>
        <li>Full responsiveness across all devices and screens</li>
        <li>Animations and interactive elements for better UX</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        The Quar Studio portfolio presents projects in an aesthetic and
        professional way. Every element is visually refined, and WordPress makes
        it easy to add new projects. The site is fast, responsive and ready for
        client presentations or agency collaboration.
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
defineProps({ project: { type: Object, required: true } });
defineEmits(['close']);
</script>

<style scoped>
@import '../../ProjectDetail.css';
</style>
