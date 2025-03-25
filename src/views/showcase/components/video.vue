<template>
  <section
    class="overflow-hidden relative border-red-200 border-solid border-[5px] rounded-[50px]">
    <img :src="imageUrl" :alt="altText" class="object-cover size-full" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { VideoFeatureProps } from "../types.ts";

export default defineComponent({
  name: "VideoFeature",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "Video thumbnail",
    },
  },
  setup(props: VideoFeatureProps) {
    return {
      imageUrl: props.imageUrl,
      altText: props.altText,
    };
  },
});
</script>

<style lang="scss" scoped>
section{
  width: 848px;
  height: 610px;
}
</style>