<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-transparent">
    <div class="header mx-auto px-4 md:px-8 py-6">
      <div class="flex h-[90px] justify-between items-center gap-6">
        <router-link to="/home"
          class="w-[90px] md:w-[130px] h-full rounded-[50px] bg-white/20 flex justify-center items-center">
          <img src="@/assets/home/logo.svg" alt="logo" class="h-6 md:h-8" />
        </router-link>
        <ul
          class="navbar hidden md:flex h-full mx-4 lg:mx-[24px] px-8 rounded-[50px] bg-white/20 justify-center items-center gap-6 lg:gap-[36px] flex-1">
          <li v-for="item in menuItems" :key="item.path">
            <router-link :to="item.path"
              class="font-sf-pro text-base lg:text-lg text-white hover:text-[#FBCBC1] transition-colors"
              :class="{ '!text-[#FBCBC1]': $route.path === item.path }">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <router-link to="/order"
          class="h-[90px] px-6 md:px-[48px] py-[10px] rounded-[50px] bg-[#FBCBC1] text-black font-sf-pro text-base lg:text-lg flex justify-center items-center cursor-pointer">
          Order
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuItems = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Try Acumenbot", path: "/try-acumenbot" },
  { name: "Blogs", path: "/showcase" },
  { name: "Support", path: "/support" },
];
</script>


<style lang="scss" scoped>
.header {
  width: 1584px;
}
</style>