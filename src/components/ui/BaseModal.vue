<template>
  <transition name="fade">
    <div class="modal-overlay" v-if="isOpened" @mousedown.self="close">
      <div class="modal">
        <BaseButton class="modal__close" @click="close">X</BaseButton>
        <h3 class="modal__title">
          <slot name="header">Create a folder</slot>
        </h3>
        <div class="modal__content">
          <slot name="body"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted } from "vue";

import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
  setup() {
    const isOpened = ref(false);
    const close = () => {
      isOpened.value = false;
    };
    const show = () => {
      isOpened.value = true;
    };
    const onKeyDownHandler = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        close();
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", onKeyDownHandler);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", onKeyDownHandler);
    });
    return {
      isOpened,
      close,
      show,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}
.modal {
  text-align: center;
  padding: 20px 55px 20px 25px;
  max-width: 400px;
  width: 100%;
  margin: auto;
  background-color: $white-color;
  border-radius: 13px;
  position: relative;
  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
