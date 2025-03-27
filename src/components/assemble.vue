<template>
  <footer class="footer-container border-t border-white bg-black text-white w-full px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="item md:text-center">
        <h2 class="text-xl md:text-3xl">Contact Us</h2>
        <a href="mailto:support@acumenbot.ai"
          class="block hover:text-gray-300 transition text-base md:text-2xl">support@acumenbot.ai</a>
      </div>

      <div class="item md:text-center">
        <h2 class="text-xl md:text-3xl">App Download</h2>
        <div class="colums">
          <a href="#" class="block hover:text-gray-300 transition text-base md:text-2xl">Apple store</a>
          <a href="#" class="block hover:text-gray-300 transition text-base md:text-2xl">Google store</a>
        </div>
      </div>

      <div class="item md:text-center">
        <h2 class="text-xl md:text-3xl">More</h2>
        <div class="colums">
          <a href="#" class="block hover:text-gray-300 transition text-base md:text-2xl">Privacy policy</a>
          <a href="#" class="block hover:text-gray-300 transition text-base md:text-2xl">Refund policy</a>
          <a href="#" class="block hover:text-gray-300 transition text-base md:text-2xl">Terms of use</a>
          <a href="#" class="block hover:text-gray-300 transition text-base md:text-2xl">Support</a>
        </div>
      </div>
    </div>

    <div class="copyright md:text-center text-lg md:text-xl mt-6 hidden md:block">
      <p>Copyright © 2025 Acumenbot LLC. All rights reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  padding-top: 24px;
  padding-bottom: 10px;

  .grid {
    .item {
      h2 {
        color: #FFF;
        font-family: "SF Pro";
        font-style: normal;
        font-weight: bold;
        line-height: normal;
        margin-bottom: 10px;
      }

      .colums {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      a {
        color: #FFF;
        font-family: "SF Pro";
        font-style: normal;
        font-weight: lighter;
        line-height: normal;
      }
    }
  }
}
</style>