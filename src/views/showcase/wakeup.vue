<template>
  <section class="section-container">
    <VideoFeature
      :imageUrl="
        feature.videoUrl ||
        'https://cdn.builder.io/api/v1/image/assets/TEMP/03dfe3db63ba3a70cbb702787cd84c61e874bc7d'
      "
      altText="Video thumbnail"
    />

    <FeatureDescription
      :title="feature.title"
      :description="feature.description"
    />
  </section>
</template>

<script setup lang="ts">
import VideoFeature from "./components/video.vue";
import FeatureDescription from "./components/description.vue";
import type { Feature } from "./types.ts";

defineProps({
  feature: {
    type: Object as () => Feature,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.section-container {
  display: flex;
  gap: 59px;
  

}
</style>