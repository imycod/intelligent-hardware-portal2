<template>
  <section
    class="flex px-[60px] py-[100px] flex-col items-start gap-[30px] self-stretch"
  >
    <p class="font-sf-pro text-2xl font-[410] text-white leading-normal">
      TRY DIFFERENT BLOGS TO
    </p>
    <h2
      class="font-sf-pro text-3xl md:text-4xl lg:text-[64px] font-[400] text-white"
    >
      Empower your Acumenbot.
    </h2>

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
          <div class="bg-[#FBCBC1] rounded-[20px] p-8 h-[600px]">
            <h3 class="text-black text-2xl font-medium">
              GET BETTER RESPONSES WITH BETTER PROMPTS
            </h3>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// 重命名模块以避免与组件名冲突
const SwiperAutoplay = Autoplay;
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}
</style>
