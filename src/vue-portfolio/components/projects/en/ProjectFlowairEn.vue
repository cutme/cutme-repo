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
      <h2>FlowAir</h2>
      <h3>Product page front-end – animations, parallax and interactive gallery.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The site was built as a dynamic presentation of the FlowAir SLIM air
        curtain product. The goal was a modern, engaging page that attractively
        communicates the device's functionality and real-world applications.
      </p>
      <p>
        Multimedia elements – time-lapse videos, scroll animations and a parallax
        effect – were key to visually supporting the product communication. High
        performance and smooth operation across all devices were equally important.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>Parallax effects and scroll-triggered animations</li>
        <li>Time-lapse video integration showcasing the product in action</li>
        <li>Custom interactive gallery script</li>
        <li>Multimedia performance optimisation</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A modern product page that dynamically and attractively presents the
        FlowAir SLIM air curtain. Animations, parallax and video content help
        users better understand the product's functionality.
      </p>
      <p>
        The project combines an accurate reproduction of the graphic design with
        an interactive front-end and optimised performance – working smoothly on
        both desktop and mobile.
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
