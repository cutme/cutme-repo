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
      <h2>MFD</h2>
      <h3>Front-end &amp; WordPress for a tech startup – GSAP animations, responsiveness.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        A website for a startup operating in the railway wagon sector required
        a modern, dynamic presentation of the company's technological profile.
        The graphic design had to be coded precisely and implemented in WordPress
        so the client's team can manage content independently.
      </p>
      <p>
        The site needed to stand out visually through animations and smooth
        section transitions, while maintaining high performance, full
        responsiveness and a clean code structure.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>WordPress theme implementation</li>
        <li>GSAP animations and interactive transitions</li>
        <li>Dynamic sections presenting the company's offer and technology</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Performance optimisation and clean HTML/CSS/JS architecture</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A modern, dynamic website that attractively presents the startup's
        activity and its innovative approach to the railway industry.
      </p>
      <p>
        GSAP animations and a polished front-end deliver a smooth, engaging
        user experience, while the WordPress implementation keeps content
        management straightforward for the client's team.
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
