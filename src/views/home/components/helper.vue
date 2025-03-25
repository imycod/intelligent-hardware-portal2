<template>
  <section
    class="flex px-[60px] py-[100px] flex-col items-start gap-[30px] self-stretch"
  >
    <p class="font-sf-pro text-2xl font-[410] text-white leading-normal">
      HAVING ANY TROUBLE WITH ACUMENBOT?
    </p>
    <h2
      class="font-sf-pro text-3xl md:text-4xl lg:text-[64px] font-[400] text-white"
    >
      We are here to help you.
    </h2>

    <div class="w-full">
      <swiper
        :modules="[SwiperAutoplay]"
        :slides-per-view="1.5"
        :space-between="30"
        :loop="true"
        :centered-slides="false"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="index in 10" :key="index">
          <div
            class="item bg-[#FBCBC1] rounded-[20px] py-[80px] px-[90px] flex h-[600px]"
          >
            <h3 class="l text-black text-2xl font-medium">
              "How does the smart speaker differ from other smart speakers?"
            </h3>
            <p class="r">
              Acumenbot offers a more natural experience, allowing you to
              have continuous conversations as if you were speaking with a real
              person. You can interrupt at any time without breaking the flow.
              Additionally, Acumenbot's memory enables it to recall and build
              upon past conversations, providing a more personalized and dynamic
              interaction.
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 重命名模块以避免与组件名冲突
const SwiperAutoplay = Autoplay;
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.mySwiper {
  .item {
    display: flex;
    padding: 80px 90px;
    align-items: flex-start;
    gap: 100px;
    flex-shrink: 0;
    box-sizing: border-box;
    .l {
      width: 310px;
      flex-shrink: 0;
      color: #000;
      font-family: "SF Pro";
      font-size: 48px;
      font-style: normal;
      font-weight: 410;
      line-height: normal;
      margin-right: 80px;
      box-sizing: border-box;
    }
    .r {
      color: #000;
      font-family: "SF Pro";
      font-style: normal;
      color: #000;
      font-family: "SF Pro";
      font-size: 26px;
      font-style: normal;
      font-weight: 120;
      line-height: normal;
      width: 420px;
      flex-shrink: 0;
      box-sizing: border-box;
    }
  }
}
</style>
