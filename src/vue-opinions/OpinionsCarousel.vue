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
        class="slide"
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

const swiperModules = [Autoplay];

const props = defineProps({
  lang: {
    type: String,
    default: 'pl',
  },
});

const opinions_pl = [
  {
    text: 'Bartosz impressed us with their efficient and professional manner - an approach that not only inspired confidence, but generated the results we were looking for.',
    author: 'Ahane Kmiecik, Veritas Wave',
  },
  {
    text: 'Jestem pod wrażeniem profesjonalności – słowność, terminowość, świetny kontakt i&nbsp;bardzo wysoka jakość kodu. Mogę śmiało powiedzieć, że&nbsp;to jeden z&nbsp;moich najlepszych współpracowników.',
    author: 'Marcin Kapiński, CEO Inbudo.pl',
  },
  {
    text: 'Bardzo terminowo, sumiennie i&nbsp;rzetelnie. Polecam współpracę z&nbsp;Bartoszem!',
    author: 'Jakub Zajdel, Consulting & More',
  },
  {
    text: 'Lubię współpracę z&nbsp;Bartoszem, gdyż cechuję ją minimum słów a&nbsp;maksimum otrzymywanego konkretu',
    author: 'Adam Pioch, Toastmasters International',
  },
  {
    text: 'Zleciłem pocięcie projektu od grafika do postaci skórki dla platformy Wordpress. Dostałem działającą skórkę w&nbsp;3&nbsp;dni. Zdecydowanie polecam i&nbsp;zdecydowanie robota warta swojej ceny.',
    author: 'Paweł Jóźwik, traffictrends.pl',
  },
  {
    text: 'Bardzo dobry kontakt z&nbsp;możliwością dopracowania szczegółów i&nbsp;wartościowymi sugestiami ze swojej strony. Dodatkowym atutem jest także przystępna cena i&nbsp;znajomość najnowszych standardów. Pełne zadowolenie. Polecam.',
    author: 'Damian Zbrożek',
  },
];

const opinions_en = [
  {
    text: 'Bartosz impressed us with his efficient and professional manner — an approach that not only inspired confidence but also delivered the results we were looking for.',
    author: 'Ahane Kmiecik, Veritas Wave',
  },
  {
    text: 'I am impressed by the professionalism — reliability, punctuality, great communication and very high code quality. I can confidently say that he is one of my best collaborators.',
    author: 'Marcin Kapiński, CEO Inbudo.pl',
  },
  {
    text: 'Very punctual, diligent and reliable. I highly recommend working with Bartosz!',
    author: 'Jakub Zajdel, Consulting & More',
  },
  {
    text: 'I enjoy working with Bartosz because it is defined by a minimum of words and a maximum of concrete results.',
    author: 'Adam Pioch, Toastmasters International',
  },
  {
    text: 'I ordered a graphic design to be converted into a working WordPress theme. I received a fully working theme within 3 days. Definitely recommended and absolutely worth the price.',
    author: 'Paweł Jóźwik, traffictrends.pl',
  },
  {
    text: 'Very good communication, with the possibility to refine details and receive valuable suggestions along the way. An additional advantage is the reasonable price and knowledge of the latest standards. Fully satisfied. Highly recommended.',
    author: 'Damian Zbrożek',
  },
];

const opinions = props.lang === 'en' ? opinions_en : opinions_pl;
</script>

<style>
</style>
