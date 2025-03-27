<template>
  <nav class="flex justify-between items-center navbar">
    <button
      v-for="feature in features"
      :key="feature.id"
      @click="onFeatureSelect(feature.id)"
      class="text-white cursor-pointer"
      :class="{ 'font-bold !text-[#FBCBC1]': activeFeature === feature.id }"
    >
      {{ feature.title }}
    </button>
    <span class="text-white">|</span>
    <button class="text-white cursor-pointer" @click="onFeatureSelect('')">
      COMPARISON
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
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
    const { features, activeFeature, onFeatureSelect } = toRefs(props);

    return {
      features,
      activeFeature,
      onFeatureSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  width: 1481px;
  height: 29px;
  margin: 0 auto;
  margin-bottom: 97px;
  button {
    color: #fff;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
}
</style>
