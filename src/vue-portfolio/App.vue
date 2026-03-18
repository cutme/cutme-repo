<template>
  <!-- Lista projektów -->
  <PortfolioList />

  <!-- Drawer — Teleport do body, zawsze obecny w drzewie -->
  <TheDrawer />
</template>

<script setup>
import PortfolioList from './views/PortfolioList.vue';
import TheDrawer     from './components/TheDrawer.vue';
</script>
