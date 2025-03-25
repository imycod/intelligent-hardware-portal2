<template>
  <div class="min-h-[100vh] flex flex-col">
    <Navbar />
    <div class="flex-1 bg-black">
      <router-view />
    </div>
    <Assemble />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/navbar.vue";
import Assemble from "../components/assemble.vue";
</script>
