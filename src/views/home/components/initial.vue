<template>
  <section class="relative h-screen w-full overflow-hidden">
    <div class="absolute inset-0">
      <img src="@/assets/home/1.png" alt="background" class="w-full h-full object-cover object-center" />
    </div>
    <div
      class="relative z-10 content-container mx-auto flex flex-col items-center justify-center h-full space-y-6 md:space-y-8 px-4 md:px-8">
      <div class="flex flex-col lg:md:items-start w-full items-center">
        <h1 ref="meetText"
          class="font-sf-pro text-3xl md:text-4xl lg:text-[64px] font-[270] text-white leading-tight opacity-0">
          MEET <span class="text-[#FBCBC1]">ACUMENBOT </span>
        </h1>
        <h2 ref="consultantText"
          class="font-sf-pro mt-[36px] text-3xl md:text-4xl lg:text-[64px] font-[400] text-white leading-tight opacity-0">
          YOUR ALL AROUND AI CONSULTANT
        </h2>
      </div>
      <div ref="exploreBtn" class="absolute bottom-[28px] opacity-0">
        <div class="flex items-center">
          <img src="@/assets/home/chevron-down.png" alt="down" class="h-[50px] w-[50px] ml-[7px]" />
          <img src="@/assets/home/explore-more.png" alt="more" class="w-[222px] h-[38px]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const meetText = ref(null)
const consultantText = ref(null)
const exploreBtn = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 1
    }
  })

  tl.fromTo(meetText.value,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    }
  )
    .fromTo(consultantText.value,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1
      },
      '-=0.5'
    )
    .fromTo(exploreBtn.value,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1
      },
      '-=0.3'
    )
})
</script>