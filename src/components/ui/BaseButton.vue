<template>
  <button
    :class="`button ${color}`"
    :type="role"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType, ButtonHTMLAttributes } from "vue";
export default defineComponent({
  emits: {
    click(): boolean {
      return true;
    },
  },
  props: {
    color: {
      type: String,
      default: "",
    },
    role: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  font-family: "Roboto";
  background: $main-color;
  border-radius: 12px;
  color: $white-color;
  padding: 6px 15px;
  transition: all 0.2s linear;
  max-height: 30px;
  &.text {
    background: transparent;
    color: $main-color;
    padding: 0;
  }
  &.border {
    background: transparent;
    color: $main-color;
    border: 1px solid #566885;
    border-radius: 14px;
    font-size: 14px;
    line-height: 16px;
    &:hover {
      background-color: $main-color;
      color: $white-color;
    }
  }
}
</style>
