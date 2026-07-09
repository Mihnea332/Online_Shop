<script setup>
import Header from "./views/Header.vue";
import Footer from "./views/Footer.vue";
</script>

<template>
  <div class="app-container">
    <Header v-if="!$route.meta.hideNavbar" />
    <main class="content">
      <router-view />
    </main>
    <Footer v-if="!$route.meta.hideNavbar" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
</style>
