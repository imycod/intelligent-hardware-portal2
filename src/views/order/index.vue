<template>
  <div class="bg-black w-full overflow-hidden pb-[301px]">
    <div
      class="mt-[247px] max-w-[1920px] mx-auto flex flex-col px-4 md:px-8 text-white"
    >
      <div class="flex order-area flex-col lg:flex-row">
        <!-- 左侧产品图片 -->
        <div class="w-full lg:w-[526px] lg:mr-[58px] left">
          <img
            src="@/assets/order/product.png"
            alt="Acumenbot"
            class="rounded-lg w-full"
          />
          <div class="mt-[16px] dots"></div>
          <div class="mt-[14px] t1">Estimated delivery date: June 1th</div>
          <div class="mt-[36px] t2">
            *unconditional refund through the first week after delivery;
            subscription is NOT mandatory after free trial and can be
            discontinued / reactivated at any time.
          </div>
        </div>

        <!-- 右侧产品信息 -->
        <div
          class="w-full lg:w-[1014px] flex flex-col gap-6 right mt-8 lg:mt-0"
        >
          <h1 class="text-2xl md:text-4xl font-bold t1">
            Get Acumenbot: The Future of AI-powered Convenience
          </h1>

          <div class="flex items-center gap-4 flex-wrap">
            <span class="font-bold text-xl md:text-3xl">Preorder Now for</span>
            <span class="text-xl md:text-3xl font-bold text-[#fbcbc1]"
              >$79.99</span
            >
            <span class="text-lg md:text-xl line-through text-gray-400"
              >Standard price $119.99</span
            >
          </div>

          <div class="text-lg md:text-xl text-[#fbcbc1] font-bold animate">
            Order now for 6 months of free subscription
            <p class="text-base md:text-lg">(exclusive for first 500 orders)</p>
          </div>

          <!-- 订购按钮 -->
          <button class="mt-8 transition-colors hover:bg-[#ffd4cc]">
            Order Now
          </button>

          <div class="border-t border-white animate"></div>

          <!-- 产品详情列表 -->
          <div class="desc mt-6 space-y-4">
            <div class="flex items-center gap-2">
              <p>
                3 months of GPT subscription included, 20.00$/mo after 3 months
              </p>
            </div>
            <div class="flex items-center gap-2">
              <p>Free shipping available across the US.</p>
            </div>
            <div class="flex items-center gap-2">
              <p>10W Adapter and User Manual included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8,
    },
  });

  // Update initial state setup to include .left
  gsap.set(
    [
      ".left",
      ".left img",
      ".left .dots",
      ".left .t1",
      ".left .t2",
      ".right h1",
      ".right .flex",
      ".right .animate",
      ".right button",
      ".right .border-t",
      ".right .desc > div",
    ],
    {
      opacity: 0,
      y: 50,
    }
  );

  // Add animation for .left container
  tl.to(".left", {
    opacity: 1,
    y: 0,
  })
    .to(
      ".left img",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.6"
    )
    .to(
      ".left .dots",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.4"
    )
    .to(
      ".left .t1",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.2"
    )
    .to(
      ".left .t2",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.2"
    )
    .to(
      ".right h1",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.4"
    )
    .to(
      ".right .flex",
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      },
      "-=0.2"
    )
    .to(
      ".right .animate",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.2"
    )
    .to(".right button", {
      opacity: 1,
      y: 0,
      scale: 1.05,
      duration: 0.4,
    })
    .to(".right button", {
      scale: 1,
      duration: 0.2,
    })
    .to(".right .border-t", {
      opacity: 1,
      y: 0,
      width: "100%",
      duration: 0.6,
    })
    .to(
      ".right .desc > div",
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
      },
      "-=0.2"
    );
});
</script>

<style lang="scss" scoped>
.order-area {
  .left {
    img {
      width: 100%;
      height: auto;
      max-width: 526px;
      aspect-ratio: 526/351;
    }
    .t1 {
      color: #fff;
      font-family: "SF Pro";
      font-size: 18px;
      @media (min-width: 768px) {
        font-size: 24px;
      }
      font-style: normal;
      font-weight: 120;
      line-height: normal;
    }
    .t2 {
      color: #fff;
      font-family: "SF Pro";
      font-size: 18px;
      @media (min-width: 768px) {
        font-size: 24px;
      }
      font-style: normal;
      font-weight: 120;
      line-height: normal;
    }
  }
  .right {
    h1,
    .flex,
    button,
    .desc > div {
      opacity: 0;
    }
    .t1 {
      color: #fff;
      font-family: "SF Pro";
      font-size: 28px;
      @media (min-width: 768px) {
        font-size: 36px;
      }
      font-style: normal;
      font-weight: 410;
      line-height: normal;
    }
    button {
      width: 100%;
      @media (min-width: 768px) {
        width: 234px;
      }
      height: 77px;
      margin-left: auto;
      cursor: pointer;
      display: inline-flex;
      padding: 24px 48px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 50px;
      background: #fbcbc1;
      color: black;
    }
    .desc {
      p {
        color: #fff;
        font-family: "SF Pro";
        font-size: 18px;
        @media (min-width: 768px) {
          font-size: 24px;
        }
        font-style: normal;
        font-weight: 120;
        line-height: normal;
      }
    }
  }
}
</style>
