<template>
  <button
    :class="['button', color, { loading: isLoading }]"
    :type="role"
    @click="$emit('click')"
    :disabled="isLoading"
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
    isLoading: {
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
  position: relative;
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
  &.loading {
    padding-right: 35px;
  }
  &.loading:after {
    content: "";
    position: absolute;
    flex-grow: 1;
    border-radius: 100%;
    right: 6px;
    top: 50%;
    width: 0px;
    height: 0px;
    margin-top: -2px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-left-color: #fff;
    border-top-color: #fff;
    animation: spin 0.6s infinite linear, grow 0.3s forwards ease-out;
  }
  @keyframes spin {
    to {
      transform: rotate(359deg);
    }
  }
  @keyframes grow {
    to {
      width: 14px;
      height: 14px;
      margin-top: -8px;
      right: 13px;
    }
  }
}
</style>
