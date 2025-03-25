<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=SF+Pro:wght@100;200;300;400;500&display=swap"
      rel="stylesheet"
    />
    <main
      class="px-32 flex flex-col py-24 mx-auto max-w-none min-h-screen bg-black max-md:px-5 max-md:py-10 max-md:max-w-[991px] max-sm:max-w-screen-sm"
    >
      <FeatureNavigation
        :features="features"
        :activeFeature="activeFeature"
        :onFeatureSelect="handleFeatureSelect"
      />

      <!-- Dynamic component with transition -->
      <div class="component-container  flex flex-col relative">
        <Transition 
          @enter="onEnter" 
          @leave="onLeave" 
          :css="false"
          mode="out-in"
        >
          <component
            :is="currentComponent"
            :feature="currentFeature"
            :key="activeFeature"
          ></component>
        </Transition>
      </div>

      <BottomSection :instructionText="instructionText" :onExit="handleExit" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import gsap from "gsap";
import FeatureNavigation from "./components/navigation.vue";
import VideoFeature from "./components/video.vue";
import FeatureDescription from "./components/description.vue";
import BottomSection from "./components/bottom.vue";
import WakeupFeature from "./wakeup.vue";
import ComparisonFeature from "./comparison.vue";
import type { Feature } from "./types.ts";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AcumenbotFeatureShowcase",
  components: {
    FeatureNavigation,
    VideoFeature,
    FeatureDescription,
    BottomSection,
    WakeupFeature,
    ComparisonFeature,
  },
  setup() {
    const router = useRouter();

    const features: Feature[] = [
      {
        id: "quick-wake-up",
        title: "QUICK WAKE-UP",
        description:
          'Use the simple command "Hey, bot" to effortlessly start a new conversation with Acumenbot.Acumenbot is always ready to provide intelligent support for whatever you may need',
        videoUrl:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/03dfe3db63ba3a70cbb702787cd84c61e874bc7d",
        component: "WakeupFeature",
      },
      {
        id: "reliable-stable",
        title: "RELIABLE & STABLE",
        description:
          "Acumenbot provides consistent and reliable responses, ensuring stable performance even during high-demand periods or complex queries.",
        component: "",
      },
      {
        id: "cross-devices-sync",
        title: "CROSS-DEVICES SYNC",
        description:
          "Seamlessly continue your conversations across all your devices. Acumenbot syncs your interaction history, preferences, and custom settings automatically.",
        component: "",
      },
      {
        id: "effortless-export",
        title: "EFFORTLESS EXPORT",
        description:
          "Easily export your conversations, insights, and generated content in multiple formats for sharing or future reference.",
        component: "",
      },
    ];

    const activeFeature = ref("quick-wake-up");

    const currentFeature = computed(() => {
      return features.find((f) => f.id === activeFeature.value) || features[0];
    });

    const currentComponent = ref("WakeupFeature");

    const instructionText =
      "Click on the top tag to see the action of Acumenbot in different scenario and data table";

    // Animation handlers
    const onEnter = (el: Element, done: () => void) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: done,
        }
      );
    };

    const onLeave = (el: Element, done: () => void) => {
      gsap.to(el, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: done,
      });
    };

    const handleFeatureSelect = (featureId: string) => {
      activeFeature.value = featureId;
      if (!featureId) {
        currentComponent.value = "ComparisonFeature";
      } else {
        const component = currentFeature.value.component;
        currentComponent.value = component;
      }
    };

    const handleExit = () => {
      router.push("/"); // Navigate to home or desired route
    };

    return {
      features,
      activeFeature,
      currentFeature,
      currentComponent,
      instructionText,
      handleFeatureSelect,
      handleExit,
      onEnter,
      onLeave,
    };
  },
});
</script>
