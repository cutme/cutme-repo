import { createApp } from 'vue';
import OpinionsCarousel from './OpinionsCarousel.vue';

const el = document.getElementById('opinions-app');

if (el) {
  const lang = el.dataset.lang || 'pl';

  // Remove prerendered static HTML before Vue mounts the interactive carousel.
  // The static content is only needed for Googlebot (SEO layer); once JS runs,
  // Vue takes over and renders the full Swiper carousel.
  el.innerHTML = '';

  const app = createApp(OpinionsCarousel, { lang });
  app.mount(el);
}
