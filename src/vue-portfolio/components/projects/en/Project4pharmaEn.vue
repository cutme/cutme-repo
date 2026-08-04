<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>4pharma</h2>
      <h3>Front-end for a pharma digital agency – animations, parallax, Pixel Perfect.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        A website for a digital advisory agency specialising in the
        pharmaceutical sector required a modern, dynamic front-end that would
        reflect the brand's innovative character and expertise in the medical
        and pharma market.
      </p>
      <p>
        A smooth user experience with parallax effects and scroll animations
        was key to enrich content presentation and give the site a contemporary
        feel – all while maintaining performance and a clean, extensible codebase.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>Parallax effects and scroll-triggered animations</li>
        <li>Dynamic sections showcasing services and competencies</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Animation performance optimisation</li>
        <li>Semantic HTML and organised CSS</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A modern, dynamic website that attractively presents the competencies
        of a company operating in the pharmaceutical and technology sectors.
      </p>
      <p>
        Parallax effects and scroll animations deliver a smooth and engaging
        experience, while the clean code structure allows for further
        development and integration of new features.
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
