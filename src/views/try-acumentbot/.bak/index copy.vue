<template>
  <div class="bg-black w-full overflow-hidden pb-[301px]">
    <div class="max-w-[1920px] mx-auto flex flex-col items-center px-4 md:px-8 text-white">
      <div ref="titleText" class="text-white mt-[233px] title opacity-0" v-show="!isStarted">
        Press the button to start your 5-minute free trial
      </div>
      <div ref="botText" class="text-white mt-[233px] title opacity-0" v-show="isStarted">
        Say 'Hey Bot' into your microphone to start the conversation
      </div>

      <div ref="imageBox" class="image-box mt-[126px] opacity-0" v-show="isStarted">
        <div class="light"></div>
        <img src="@/assets/bot/noactive.png" alt="" srcset="">
      </div>

      <button ref="startBtn" class="start cursor-pointer opacity-0" @click="start">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const isStarted = ref(false);
const isSpeaking = ref(true);
const isBotSpeaking = ref(false);
const buttonText = ref('Start Trial');

const titleText = ref(null);
const botText = ref(null);
const imageBox = ref(null);
const startBtn = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 1
    }
  });

  tl.fromTo(titleText.value,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    }
  ).fromTo(startBtn.value,
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1
    },
    '-=0.3'
  );
});

function start() {
  isStarted.value = !isStarted.value;
  buttonText.value = isStarted.value ? 'End Trial' : 'Start Trial';

  if (isStarted.value) {
    gsap.fromTo([botText.value, imageBox.value],
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
      }
    );
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #fff;
  text-align: center;
  font-family: "SF Pro";
  font-size: 36px;
  font-style: normal;
  font-weight: 410;
  line-height: normal;
}

.start {
  width: 215px;
  height: 77px;
  display: inline-flex;
  padding: 24px 48px;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: "SF Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 270;
  line-height: normal;
  border-radius: 50px;
  background: #fbcbc1;
  margin-top: 150px;
}
</style>
