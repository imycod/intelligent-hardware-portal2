<template>
  <footer class="footer-container border-t border-white bg-black text-white w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="item text-center">
        <h2>Contact Us</h2>
        <a href="mailto:support@acumenbot.ai" class="block hover:text-gray-300 transition">support@acumenbot.ai</a>
      </div>

      <div class="item text-center">
        <h2>App Download</h2>
        <div class="colums">
          <a href="#" class="block hover:text-gray-300 transition">Apple store</a>
          <a href="#" class="block hover:text-gray-300 transition">Google store</a>
        </div>
      </div>

      <div class="item text-center">
        <h2>More</h2>
        <div class="colums">
          <a href="#" class="block hover:text-gray-300 transition">Privacy policy</a>
          <a href="#" class="block hover:text-gray-300 transition">Refund policy</a>
          <a href="#" class="block hover:text-gray-300 transition">Terms of use</a>
          <a href="#" class="block hover:text-gray-300 transition">Support</a>
        </div>
      </div>
    </div>

    <div class="copyright text-center">
      <p>Copyright © 2025 Acumenbot LLC. All rights reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  padding-top: 24px;
  padding-bottom: 10px;

  .copyright {
    margin-top: 24px;
  }

  .grid {
    .item {
      h2 {
        color: #FFF;
        font-family: "SF Pro";
        font-size: 32px;
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
        font-size: 32px;
        font-style: normal;
        font-weight: lighter;
        line-height: normal;
      }
    }
  }

  .copyright {
    color: #FFF;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: lighter;
    line-height: normal;
  }
}
</style>