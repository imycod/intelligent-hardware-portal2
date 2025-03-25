<template>
  <section
    class="flex overflow-hidden flex-col justify-center items-center px-20 py-28 text-2xl bg-black max-md:px-5 max-md:pb-24"
  >
    <div class="w-full max-w-[1481px] max-md:max-w-full">
      <ComparisonHeader />
      <ComparisonGrid />
      <ComparisonFooter />
    </div>
  </section>
</template>

<script lang="ts">
import ComparisonHeader from "./comparison-header.vue";
import ComparisonGrid from "./comparison-grid.vue";
import ComparisonFooter from "./comparison-footer.vue";

export default {
  name: "ComparisonTable",
  components: {
    ComparisonHeader,
    ComparisonGrid,
    ComparisonFooter,
  },
};
</script>
