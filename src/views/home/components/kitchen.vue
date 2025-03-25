<template>
  <section class="relative mt-[4vh]">
    <img src="@/assets/home/2.png" alt="section2" class="w-full h-[90vh] object-cover object-center" />
    <div ref="overlay" class="absolute inset-0 opacity-0" style="background: rgba(0, 0, 0, 0.50);">
      <div class="mx-auto px-[clamp(1rem,_8vw,_192px)] h-full flex flex-col items-start justify-center text-white">
        <div class="w-full flex flex-col items-start">
          <h2 ref="title" class="title opacity-0 translate-y-10">Superior Conversations</h2>
          <p ref="description" class="desc opacity-0 translate-y-10">Acumenbot is
            powered
            with
            the newest ChatGPT model and trained to converse like a human. If you're frustrated with how existing AI
            assistants fail to understand or hold a conversation, Acumenbot is the upgrade you're looking for.
          </p>
          <div class="w-full flex justify-end">
            <button ref="button" class="opacity-0 translate-y-10 hover:bg-[#ffc0c0] cursor-pointer">Try
              Acumenbot <img src="@/assets/home/arrow-up-right.png" alt="" srcset=""></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const overlay = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const description = ref<HTMLElement | null>(null)
const button = ref<HTMLElement | null>(null)

onMounted(() => {
  if (overlay.value && title.value && description.value && button.value) {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: overlay.value,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      },
      onComplete: () => {
      }
    })

    tl.to(overlay.value, {
      opacity: 1,
      duration: 0.8
    })
      .to(title.value, {
        opacity: 1,
        y: 0,
        duration: 0.6
      })
      .to(description.value, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.3')
      .to(button.value, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.3')
  }
})
</script>

<style lang="scss" scoped>
section {
  font-family: 'SF Pro Display', 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
}

button {
  display: inline-flex;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 3.125rem;
  background: #FBCBC1;
  color: #000;
  font-family: "SF Pro";
  font-size: clamp(1.25rem, 2vw, 2rem);
  font-weight: 270;
  line-height: 1.2;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(251, 203, 193, 0.3);
}

.title {
  color: #FFF;
  font-family: "SF Pro";
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 270;
  line-height: 1.2;
  margin-bottom: clamp(1rem, 3vh, 2rem);
}

.desc {
  color: #FFF;
  font-family: "SF Pro";
  font-size: clamp(1.25rem, 3vw, 3rem);
  font-weight: 274;
  line-height: 1.4;
  margin-bottom: clamp(2rem, 5vh, 4rem);
}

@media (max-width: 768px) {
  .desc {
    font-size: clamp(1rem, 4vw, 1.5rem);
  }

  button {
    width: 100%;
  }
}
</style>