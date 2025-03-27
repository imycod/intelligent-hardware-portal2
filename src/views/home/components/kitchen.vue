<template>
  <section class="section-container relative">
    <img
      src="@/assets/home/2.png"
      alt="bg"
      class="w-full h-full object-cover object-center"
    />
    <div
      ref="overlay"
      class="absolute inset-0"
      style="background: rgba(0, 0, 0, 0.5)"
    >
      <div
        class="mx-auto content-container h-full flex flex-col justify-center text-white"
      >
        <div class="w-full flex flex-col items-start">
          <h2 ref="title" class="title opacity-0 translate-y-10">
            Superior Conversations
          </h2>
          <p ref="description" class="desc opacity-0 translate-y-10">
            Acumenbot is powered with the newest ChatGPT model and trained to
            converse like a human. If you're frustrated with how existing AI
            assistants fail to understand or hold a conversation, Acumenbot is
            the upgrade you're looking for.
          </p>
          <div class="button-wrapper w-full flex justify-end">
            <button
              ref="button"
              class="translate-y-10 opacity-0 hover:bg-[#ffc0c0] cursor-pointer"
            >
              Try Acumenbot
              <img src="@/assets/home/arrow-up-right.png" alt="" srcset="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const overlay = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const description = ref<HTMLElement | null>(null);
const button = ref<HTMLElement | null>(null);

onMounted(() => {
  if (overlay.value && title.value && description.value && button.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: overlay.value,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {},
    });

    tl.to(overlay.value, {
      opacity: 1,
      duration: 0.8,
    })
      .to(title.value, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })
      .to(
        description.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(
        button.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );
  }
});
</script>

<style lang="scss" scoped>
.section-container {
  font-family: "SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont,
    sans-serif;
  .button-wrapper {
    button {
      width: 392px;
      height: 86px;
      display: flex;
      padding: 24px 48px;
      justify-content: space-around;
      align-items: center;
      border-radius: 50px;
      background: #fbcbc1;
      transition: all 0.3s ease;
      color: #000;
      font-family: "SF Pro";
      font-size: 32px;
      font-style: normal;
      font-weight: 270;
      line-height: normal;
      img {
        width: 30px;
        height: 30px;
      }
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(251, 203, 193, 0.3);
    }
  }

  .title {
    color: #fff;
    font-family: "SF Pro";
    font-size: 64px;
    font-style: normal;
    font-weight: 270;
    line-height: normal;
  }

  .desc {
    margin-top: 128px;
    color: #fff;
    font-family: "SF Pro";
    font-size: 48px;
    font-style: normal;
    font-weight: 274;
    line-height: normal;
  }
}
</style>
