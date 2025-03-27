<template>
  <div class="order-container w-full h-full overflow-hidden">
    <div class="content-container mx-auto flex flex-col">
      <div class="flex order-area flex-col lg:flex-row">
        <!-- 左侧产品图片 - 使用Swiper轮播 -->
        <div class="left">
          <swiper :modules="[SwiperPagination, SwiperAutoplay]" :slides-per-view="1" :pagination="{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }" :autoplay="{ delay: 5000, disableOnInteraction: false }" class="product-swiper rounded-lg">
            <swiper-slide v-for="(image, index) in productImages" :key="index">
              <img :src="image" alt="Acumenbot" class="rounded-lg w-full" />
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
          <div class="dots"></div>
          <div class="t1">Estimated delivery date: June 1th</div>
          <div class="t2">
            *unconditional refund through the first week after delivery;
            subscription is NOT mandatory after free trial and can be
            discontinued / reactivated at any time.
          </div>
        </div>

        <!-- 右侧产品信息 -->
        <div class="right">
          <h1 class="row1 animate">
            Get Acumenbot: The Future of AI-powered Convenience
          </h1>

          <div class="row2 animate">
            <span class="t1">Preorder Now for</span>
            <span class="t2">$79.99</span>
            <span class="t3">Standard price $119.99</span>
          </div>

          <div class="row3 animate">
            Order now for 6 months of free subscription (exclusive for first 500
            orders)
          </div>

          <!-- 订购按钮 -->
          <button class="transition-colors hover:bg-[#ffd4cc] animate">
            Order Now
          </button>

          <div class="divider border-t border-white animate"></div>

          <!-- 产品详情列表 -->
          <div class="desc-container">
            <p class="animate">
              3 months of GPT subscription included, 20.00$/mo after 3 months
            </p>
            <p class="animate">Free shipping available across the US.</p>
            <p class="animate">10W Adapter and User Manual included</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Pagination as SwiperPagination,
  Autoplay as SwiperAutoplay,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import product1 from "@/assets/order/product.png";
// Define product images array
const productImages = ref([product1, product1, product1, product1]);

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8,
    },
  });

  // Update initial state setup for all animated elements
  gsap.set(
    [
      ".left",
      ".product-swiper",
      ".left .dots",
      ".left .t1",
      ".left .t2",
      ".right .animate",
      ".right button",
      ".right .divider",
      ".desc-container p",
    ],
    {
      opacity: 0,
      y: 50,
    }
  );

  // Create sequential animation timeline
  tl.to(".left", {
    opacity: 1,
    y: 0,
    duration: 0.7,
  })
    .to(
      ".product-swiper",
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
      },
      "-=0.4"
    )
    .to(
      ".left .dots",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to(
      ".left .t1",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to(
      ".left .t2",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to(
      ".right .row1",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to(
      ".right .row2",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to(
      ".right .row3",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3"
    )
    .to(
      ".right button",
      {
        opacity: 1,
        y: 0,
        scale: 1.05,
        duration: 0.5,
      },
      "-=0.2"
    )
    .to(
      ".right button",
      {
        scale: 1,
        duration: 0.3,
      }
    )
    .to(
      ".right .divider",
      {
        opacity: 1,
        y: 0,
        width: "100%",
        duration: 0.6,
      }
    )
    .to(".desc-container p", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    });
});
</script>

<style lang="scss" scoped>
.order-container {
  margin-top: calc(var(--header-top) + var(--header-height) + 181px);
  margin-bottom: 323px;

  .order-area {
    .left {
      width: 526px;

      .product-swiper {
        width: 100%;
        height: auto;
        max-width: 526px;
        aspect-ratio: 526/351;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .dots {
        margin-top: 36px;
      }

      .t1 {
        margin-top: 54px;
        color: #fff;
        font-family: "SF Pro";
        font-size: 24px;
        font-style: normal;
        font-weight: 120;
        line-height: normal;
      }

      .t2 {
        margin-top: 36px;
        color: #fff;
        font-family: "SF Pro";
        font-size: 24px;
        font-style: normal;
        font-weight: 120;
        line-height: normal;
      }
    }

    .right {
      margin-left: 58px;
      display: flex;
      gap: 16px;
      flex-direction: column;

      .row1 {
        color: #fff;
        font-family: "SF Pro";
        font-size: 36px;
        font-style: normal;
        font-weight: 410;
        line-height: normal;
      }

      .row2 {
        .t1 {
          color: #fff;
          font-family: "SF Pro";
          font-size: 36px;
          font-style: normal;
          font-weight: 760;
          line-height: normal;
        }

        .t2 {
          color: #fbcbc1;
          font-family: "SF Pro";
          font-size: 36px;
          font-style: normal;
          font-weight: 760;
          line-height: normal;
        }

        .t3 {
          color: #fff;
          font-family: "SF Pro";
          font-size: 36px;
          font-style: normal;
          font-weight: 30;
          line-height: normal;
          text-decoration: line-through;
        }
      }

      .row3 {
        color: #fbcbc1;
        font-family: "SF Pro";
        font-size: 36px;
        font-style: normal;
        font-weight: 760;
        line-height: normal;
      }

      button {
        display: inline-flex;
        padding: 24px 48px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 50px;
        background: #fbcbc1;
        margin-left: auto;
      }

      .divider {
        margin-top: 55px;
      }

      .desc-container {
        display: flex;
        flex-direction: column;
        gap: 36px;
        margin-top: 54px;

        p {
          color: #fff;
          font-family: "SF Pro";
          font-size: 24px;
          font-style: normal;
          font-weight: 120;
          line-height: normal;
        }
      }
    }
  }

  :deep(.swiper-pagination) {
    position: relative;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  :deep(.swiper-pagination-bullet) {
    width: 24px;
    height: 4px;
    border-radius: 2px;
    background: white;
    opacity: 0.5;
    margin: 0 !important;
  }

  :deep(.swiper-pagination-bullet-active) {
    background: #fbcbc1;
    opacity: 1;
  }
}
</style>
