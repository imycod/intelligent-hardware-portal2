<template>
  <footer class="flex justify-between items-center mt-20 max-md:flex-col max-md:gap-5 max-md:text-center">
    <p class="text-2xl text-white font-[410] max-sm:text-lg">
      {{ instructionText }}
    </p>
    <button @click="onExit"
      class="px-12 py-6 text-2xl text-black bg-red-200 cursor-pointer font-[270] rounded-[50px] max-sm:px-8 max-sm:py-4 max-sm:text-xl">
      Exit
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { BottomSectionProps } from "../types";

export default defineComponent({
  name: "BottomSection",
  props: {
    instructionText: {
      type: String,
      required: true,
    },
    onExit: {
      type: Function,
      required: true,
    },
  },
  setup(props: BottomSectionProps) {
    return {
      instructionText: props.instructionText,
      onExit: props.onExit,
    };
  },
});
</script>
