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
      <h2>126 marek</h2>
      <h3>Semantic front-end &amp; animations for a brand showcase platform.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The project involved coding a website that presents a wide variety of
        brands in a clear and modern visual form. A key requirement was a
        semantic HTML structure ensuring good code readability, correct search
        engine indexing and ease of future development.
      </p>
      <p>
        Subtle animations were also an important part of the implementation –
        enriching user interactions and giving the site a dynamic character
        while maintaining high performance.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>Semantic HTML structure</li>
        <li>GSAP animations and interaction effects</li>
        <li>SEO-oriented code structure</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Clean and well-organised HTML, CSS and JavaScript architecture</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A modern, lightweight front-end that presents brands in an attractive
        visual form while maintaining structural clarity and high performance.
      </p>
      <p>
        Thanks to semantic code and a well-organised architecture, the site is
        easy to extend further and integrate with CMS systems or additional
        functionality.
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
