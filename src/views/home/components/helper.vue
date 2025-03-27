<template>
  <section class="section-container flex flex-col items-start self-stretch">
    <p class="font-sf-pro text-white">TRY DIFFERENT BLOGS TO</p>
    <h2 class="font-sf-pro text-white">Empower your Acumenbot.</h2>

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
          <div class="item">
            <span class="left"
              >“How does the smart speaker differ from other smart
              speakers?”</span
            >
            <span class="right">
              Acumenbot offers a more natural experience, allowing you to
              have continuous conversations as if you were speaking with a real
              person. You can interrupt at any time without breaking the flow.
              Additionally, Acumenbot's memory enables it to recall and build
              upon past conversations, providing a more personalized and dynamic
              interaction.
            </span>
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
      width: 1000px;
      height: 400px;
      border: 1px solid red;
      padding: 80px 90px;
      align-items: flex-start;
      gap: 100px;
      flex-shrink: 0;
      border-radius: 50px;
      background: #fbcbc1;
      .left {
        width: 310px;
        flex-shrink: 0;
        color: #000;
        font-family: "SF Pro";
        font-size: 36px;
        font-style: normal;
        font-weight: 410;
        line-height: normal;
      }
      .right {
        color: #000;
        font-family: "SF Pro";
        font-size: 20px;
        font-style: normal;
        font-weight: 120;
        line-height: normal;
      }
    }
  }
}
</style>
