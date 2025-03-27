<template>
  <div class="min-h-[100vh] bg-black flex flex-col">
    <Navbar />
    <div class="flex-1">
      <router-view />
    </div>
    <div class="footer-container">
      <Assemble />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/navbar.vue";
import Assemble from "../components/assemble.vue";
</script>

<style lang="scss" scoped>
.footer-container {
  padding: 10px 30px;
}
</style>
