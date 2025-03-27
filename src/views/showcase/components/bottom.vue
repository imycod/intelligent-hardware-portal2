<template>
  <footer class="flex justify-between items-center">
    <p class="instruction-text">
      {{ instructionText }}
    </p>
    <button @click="onExit" class="exit-button">Exit</button>
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

<style lang="scss" scoped>
footer {
  margin-top: 121px;
  display: flex;
  justify-content: space-between;
  .exit-button {
    display: inline-flex;
    padding: 24px 48px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50px;
    background: #fbcbc1;
    color: #000;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 270;
    line-height: normal;
  }
  .instruction-text {
    color: #fff;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
}
</style>
