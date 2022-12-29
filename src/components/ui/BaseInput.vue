<template>
  <div class="form-group">
    <input
      :class="['form-control', { error: error }]"
      :id="id"
      :value="modelValue"
      @input="updateValue"
      v-bind="$attrs"
      @focus="$emit('onFocus')"
    />
    <transition name="fade">
      <small v-if="error">{{ error }}</small>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    id: {
      type: String,
      default: "",
    },

    error: {
      type: null as unknown as PropType<string | null>,
      default: null,
      validator: (v: any) => typeof v === "string" || v === null,
    },
  },
  emits: ["update:modelValue", "onFocus"],
  setup(props, ctx) {
    const updateValue = (e: Event) => {
      ctx.emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    return {
      updateValue,
    };
  },
});
</script>

<style scoped lang="scss">
.form-group {
  position: relative;
}
.form-control {
  border-bottom: 2px solid $main-color;
  height: auto;
  font-weight: 700;
  font-family: "Roboto";
  font-size: 16px;
  padding: 15px 5px 3px 5px;
  line-height: 22px;
  width: 100%;
  color: $main-color;
  transition: all 0.2s linear;
  &::placeholder {
    color: $main-color;
  }
  &:focus {
    outline: none;
  }
  &.error {
    border-color: red;
  }
}
label {
  text-align: left;
  font-size: 14px;
  line-height: 18px;
  display: inline-block;
  color: #a5a5a5;
  margin-bottom: 8px;
}
small {
  color: red;
  display: inline-block;
  font-size: 15px;
  position: absolute;
  bottom: -20px;
  z-index: 1;
  left: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
