<template>
  <article class="max-w-[574px] max-md:max-w-full max-md:text-center">
    <h2 class="mb-9 text-5xl text-white font-[410] max-sm:text-3xl">
      {{ title }}
    </h2>
    <p class="text-3xl leading-snug text-white font-[120] max-sm:text-2xl">
      {{ description }}
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { FeatureDescriptionProps } from "../types";

export default defineComponent({
  name: "FeatureDescription",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup(props: FeatureDescriptionProps) {
    return {
      title: props.title,
      description: props.description,
    };
  },
});
</script>
