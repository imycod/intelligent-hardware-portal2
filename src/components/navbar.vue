<template>
  <nav class="navbar-container absolute top-0 left-0 right-0 z-50 bg-transparent">
    <div class="content-container header mx-auto">
      <div class="w-full h-full flex justify-between items-center">
        <router-link to="/home" class="logo">
          <img src="@/assets/home/logo.svg" alt="logo" />
        </router-link>
        <ul class="navbar">
          <li v-for="item in menuItems" :key="item.path">
            <router-link :to="item.path" class="font-sf-pro text-white hover:text-[#FBCBC1] transition-colors"
              :class="{ '!text-[#FBCBC1]': $route.path === item.path }">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <router-link to="/order" class="order cursor-pointer">
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
.navbar-container {
  margin-top: 75px;

  .header {
    height: var(--header-height);

    .logo {
      display: flex;
      width: 130px;
      height: 100%;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.2);

      img {
        width: 50px;
        height: 40px;
      }
    }

    .navbar {
      width: 1235px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 36px;
      align-self: stretch;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.2);

      ul,
      li {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 410;
      }
    }

    .order {
      display: flex;
      height: 100%;
      padding: 10px 48px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 50px;
      background: #fbcbc1;
      color: #000;
      font-family: "SF Pro";
      font-size: 24px;
      font-style: normal;
      font-weight: 410;
      line-height: normal;
    }
  }
}
</style>
