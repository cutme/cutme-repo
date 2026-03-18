/**
 * main.js — entry point mini-aplikacji Vue portfolio
 * Montuje się na <section id="portfolio-app">
 * Izolowany od reszty strony — zero wspólnych zależności z app.js
 */
import { createApp } from 'vue';
import App from './App.vue';
import nowidows from './directives/nowidows';

const el = document.getElementById('portfolio-app');

if (el) {
  const app = createApp(App);
  app.directive('nowidows', nowidows);
  app.mount(el);
} else {
  console.warn('[vue-portfolio] Brak elementu #portfolio-app w DOM');
}
