<template>
  <article class="article">
    <h2 class="title text-white">
      {{ title }}
    </h2>
    <p class="desc">
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

<style lang="scss" scoped>
.article {
  flex: 1;
  .title {
    margin-bottom: 36px;
    color: #fff;
    font-family: "SF Pro";
    font-size: 48px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
  .desc {
    color: #fff;
    font-family: "SF Pro";
    font-size: 32px;
    font-style: normal;
    font-weight: 120;
    line-height: normal;
  }
}
</style>
