<template>
  <section class="relative h-screen w-full overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="@/assets/home/1.png"
        alt="background"
        class="w-full h-full object-cover object-center"
      />
    </div>
    <div
      class="relative z-10 content-container mx-auto flex flex-col items-center justify-center h-full"
    >
      <div
        class="flex title-container flex-col lg:md:items-start w-full items-center"
      >
        <h1 ref="meetText" class="font-sf-pro text-white">
          MEET <span class="text-[#FBCBC1]">ACUMENBOT </span>
        </h1>
        <h2 ref="consultantText" class="font-sf-pro text-white">
          YOUR ALL AROUND AI CONSULTANT
        </h2>
      </div>
      <div ref="exploreBtn" class="absolute explore-btn">
        <div class="flex justify-around w-full items-center">
          <img
            src="@/assets/home/chevron-down.png"
            alt="down"
            class="down-icon"
          />
          <span>Explore more</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const meetText = ref(null);
const consultantText = ref(null);
const exploreBtn = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  tl.fromTo(
    meetText.value,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    }
  )
    .fromTo(
      consultantText.value,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      "-=0.5"
    )
    .fromTo(
      exploreBtn.value,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      "-=0.3"
    );
});
</script>

<style lang="scss" scoped>
.title-container {
  h1 {
    color: #fff;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  h2 {
    margin-top: 36px;
    color: #fff;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

.explore-btn {
  width: 279px;
  height: 50px;
  bottom: 28px;
  .down-icon {
    width: 50px;
    height: 50px;
  }
  span {
    color: #fbcbc1;
    font-size: 32px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
}
</style>
