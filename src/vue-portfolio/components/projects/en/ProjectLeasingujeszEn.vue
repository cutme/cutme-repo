<template>
  <article class="pd">
    <PdHero :project="project" />
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{ skill }}</span>
    </div>

    <header class="pd__header" v-nowidows>
      <h2>Leasingujesz</h2>
      <h3>Front-end for a financial portal – leasing offer comparison platform.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <h4>Brief</h4>
      <p>
        The project involved building a modern, clear front-end for a portal
        that lets users compare leasing offers from multiple financial
        institutions. The site needed to present a large amount of information
        clearly and make it easy to quickly compare available financing options.
      </p>
      <p>
        Accurate reproduction of the graphic design and a clean layout structure
        were key, along with preparing a front-end ready for further expansion
        with new features and financial system integrations.
      </p>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>My role</h4>
      <ul class="pd__ticks">
        <li>Pixel Perfect front-end coding from graphic design</li>
        <li>Portal layout with leasing offer presentation sections</li>
        <li>Offer comparison and financial data display sections</li>
        <li>Full responsiveness – mobile, tablet, desktop</li>
        <li>HTML and CSS structure optimisation for clarity and performance</li>
        <li>Code prepared for future portal feature expansion</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Result</h4>
      <p>
        A clear and functional financial portal front-end that lets users easily
        compare leasing offers and quickly find the best financing solution.
      </p>
      <p>
        The site structure was designed for clear data presentation and the
        ability to expand with additional sections, integrations and features.
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
