<template>
  <div class="js-fadeInChildren">
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5500, disableOnInteraction: true }"
      :speed="600"
      :modules="swiperModules"
      class="opinions-swiper"
    >
      <SwiperSlide
        v-for="(opinion, index) in opinions"
        :key="index"
        class="slide js-nowidows"
      >
        <blockquote class="max-w-5xl mx-auto clamp-[px,6,24]">
          <p
            itemprop="text"
            class="font-serif mb-8 clamp-[text,xl,2.25rem]"
            v-html="opinion.text"
          ></p>
          <p class="text-sm text-gray-300">— {{ opinion.author }}</p>
        </blockquote>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Jedyne źródło prawdy — src/data/opinions.json
// Aby dodać/edytować opinię: edytuj tylko ten plik JSON.
import opinionsData from '../data/opinions.json';

const swiperModules = [Autoplay];

const props = defineProps({
  lang: {
    type: String,
    default: 'pl',
  },
});

const opinions = opinionsData.map(o => ({
  text: props.lang === 'en' ? o.en : o.pl,
  author: o.author,
}));
</script>

<style>
</style>
