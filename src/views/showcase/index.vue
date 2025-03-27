<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=SF+Pro:wght@100;200;300;400;500&display=swap"
      rel="stylesheet"
    />
    <main class="showcase-container flex flex-col min-h-screen bg-black">
      <FeatureNavigation
        :features="features"
        :activeFeature="activeFeature"
        :onFeatureSelect="handleFeatureSelect"
      />

      <!-- Dynamic component with transition -->
      <div class="component-container flex flex-col relative">
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
        title: "Reliable and Stable",
        description:
          "Backed by robust servers, Acumenbot demonstrates exceptional stability. It consistently provides intelligent and reliable responses, as long as you have good internet connectivity",
        component: "WakeupFeature",
      },
      {
        id: "cross-devices-sync",
        title: "Cross-Device Sync",
        description:
          "Use Acumenbot on your phone, tablet , or PC with our app or web interface. Conversations are automatically synced in the cloud, ensuring you can conveniently pick up where you left off on any device, anytime. ",
        component: "WakeupFeature",
      },
      {   
        id: "effortless-export",
        title: "Effortless Export",
        description:
          "You can easily export your conversations with Acumenbot as a text file. . This allows you to record your spontaneous good ideas that you might not even remember yourself.",
        component: "WakeupFeature",
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

<style lang="scss" scoped>
.showcase-container {
  padding-top: 94px;
  padding-right: 123px;
  padding-left: 124px;
}
</style>
