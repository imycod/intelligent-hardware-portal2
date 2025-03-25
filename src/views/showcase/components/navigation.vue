<template>
  <nav
    class="flex justify-between items-center mb-20 max-md:flex-wrap max-md:gap-5 max-md:justify-center max-sm:justify-between"
  >
    <button
      v-for="feature in features"
      :key="feature.id"
      @click="onFeatureSelect(feature.id)"
      class="text-2xl text-white cursor-pointer font-[410]"
      :class="{ 'font-bold': activeFeature === feature.id }"
    >
      {{ feature.title }}
    </button>
    <span class="text-2xl text-white">|</span>
    <button
      class="text-2xl text-white cursor-pointer font-[410]"
      @click="onFeatureSelect('')"
    >
      COMPARISON
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { FeatureNavigationProps } from "../types.ts";

export default defineComponent({
  name: "FeatureNavigation",
  props: {
    features: {
      type: Array,
      required: true,
    },
    activeFeature: {
      type: String,
      required: true,
    },
    onFeatureSelect: {
      type: Function,
      required: true,
    },
  },
  setup(props: FeatureNavigationProps) {
    return {
      features: props.features,
      activeFeature: props.activeFeature,
      onFeatureSelect: props.onFeatureSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
nav{
  width: 1481px;
}
</style>