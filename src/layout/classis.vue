<template>
  <Navbar />
  <router-view />
  <Assemble />
</template>

<script setup lang="ts">
import Navbar from "../components/navbar.vue";
import Assemble from "../components/assemble.vue"
</script>