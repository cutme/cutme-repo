<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>FT Fund</h2>
      <h3>Front-end &amp; WordPress implementation for a financial company landing page.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The project involved creating a modern landing page for a company
        operating in the financial sector. The site needed to present the
        loan offer clearly and guide users through the key information about
        the financial product.
      </p>
      <p>
        Accurate reproduction of the graphic design and WordPress implementation
        were essential – allowing the client to manage content independently
        and expand the site in the future. SEO optimisation and correct code
        structure were also important requirements.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>WordPress theme implementation</li>
        <li>Landing page structure presenting the financial offer</li>
        <li>HTML structure optimisation for SEO</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>Clean code prepared for further development</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A clear, modern landing page that effectively presents the financial
        company's offer and guides users through each section of the site.
      </p>
      <p>
        The WordPress implementation allows the client's team to manage and
        expand the site easily, while the optimised code structure supports
        good search engine visibility.
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
