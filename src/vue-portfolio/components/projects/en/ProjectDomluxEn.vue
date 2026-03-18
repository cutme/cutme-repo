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
      <h2>DomLux</h2>
      <h3>Premium brand front-end – Pixel Perfect, aesthetics, performance.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        A website for a luxury furniture manufacturer required a precise
        reproduction of the graphic design with a strong emphasis on aesthetics,
        minimalism and visual details that reflect the premium nature of the brand.
      </p>
      <p>
        Maintaining high visual quality, smooth transitions and full
        responsiveness were critical – especially for photo presentation and
        layout composition across different screen sizes.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>Full responsiveness – mobile, tablet, desktop, large screens</li>
        <li>Typography refinement and layout proportions</li>
        <li>Subtle animations and interaction effects</li>
        <li>Image optimisation and loading performance</li>
        <li>Semantic HTML and organised CSS architecture</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        An elegant, lightweight and visually polished website that highlights
        the exclusive character of the brand and the quality of its products.
      </p>
      <p>
        Delivered with great attention to detail and clean code, ensuring
        stability and readiness for further development.
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
