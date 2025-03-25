<template>
  <div
    class="flex flex-wrap gap-7 justify-between items-center text-white font-[410]"
  >
    <ComparisonFeatureTag>QUICK WAKE-UP</ComparisonFeatureTag>
    <ComparisonFeatureTag>RELIABLE & STABLE</ComparisonFeatureTag>
    <ComparisonFeatureTag>CROSS-DEVICES SYNC</ComparisonFeatureTag>
    <ComparisonFeatureTag>EFFORTLESS EXPORT</ComparisonFeatureTag>
    <ComparisonFeatureTag>|</ComparisonFeatureTag>
    <ComparisonFeatureTag :isHighlighted="true"
      >COMPARISON</ComparisonFeatureTag
    >
  </div>
</template>

<script lang="ts">
import ComparisonFeatureTag from "./comparison-feature-tag.vue";

export default {
  name: "ComparisonHeader",
  components: {
    ComparisonFeatureTag,
  },
};
</script>
