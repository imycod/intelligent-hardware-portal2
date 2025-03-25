<template>
  <div class="self-stretch my-auto" :class="{ 'text-red-200': isHighlighted }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "ComparisonFeatureTag",
  props: {
    isHighlighted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
