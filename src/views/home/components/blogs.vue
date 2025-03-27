<template>
  <section class="section-container flex flex-col items-start self-stretch">
    <p class="font-sf-pro text-white">TRY DIFFERENT BLOGS TO</p>
    <h2 class="font-sf-pro text-white">Empower your Acumenbot.</h2>

    <div class="w-full">
      <swiper
        :modules="[SwiperAutoplay]"
        :slides-per-view="2.5"
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
          <div class="item">GET BETTER RESPONSES WITH BETTER PROMPTS</div>
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
.section-container {
  padding-top: 100px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 100px;
  gap: 30px;
  p {
    color: #fff;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
  h2 {
    color: #fff;
    font-family: "SF Pro";
    font-size: 80px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
  .swiper {
    width: 100%;
    height: 100%;
    .item {
      display: flex;
      padding: 80px 142px 300px 90px;
      align-items: center;
      border-radius: 50px;
      background: #fbcbc1;
      color: #000;
      font-family: "SF Pro";
      font-size: 48px;
      font-style: normal;
      font-weight: 274;
      line-height: normal;
    }
  }
}
</style>
