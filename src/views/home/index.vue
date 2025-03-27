<template>
  <div class="home-container min-h-screen bg-black w-full overflow-hidden">
    <!-- main -->
    <Initial />

    <!-- 0 -->
    <Kitchen />
    <!-- 1 -->
    <Cupboard />
    <!-- 2 -->
    <LivingRoom />

    <!-- 4 -->
    <Propaganda />

    <!-- 5 -->
    <Product />
    <!-- 6 -->
    <Blogs />
    <!-- 7 -->
    <Helper />
    <!-- 8 -->
    <Subscriber />
  </div>
</template>

<script setup lang="ts">
import Initial from './components/initial.vue'
import LivingRoom from './components/living-room.vue'
import Kitchen from "./components/kitchen.vue"
import Cupboard from './components/cupboard.vue'
import Propaganda from './components/propaganda.vue'
import Product from "./components/product.vue"
import Blogs from "./components/blogs.vue"
import Helper from "./components/helper.vue"
import Subscriber from "./components/subscriber.vue"

</script>

<style lang="scss" scoped>
.font-sf-pro {
  font-family: "SF Pro", sans-serif;
}
.home-container{
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>