import { createApp } from 'vue';
import OpinionsCarousel from './OpinionsCarousel.vue';

const el = document.getElementById('opinions-app');

if (el) {
  const lang = el.dataset.lang || 'pl';
  const app = createApp(OpinionsCarousel, { lang });
  app.mount(el);
}
