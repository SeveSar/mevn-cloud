<template>
  <div class="toast-container" id="toast-container">
    <transition-group name="toast">
      <div
        class="toast"
        v-for="item in toasts"
        :class="[item.type]"
        :key="item.id"
      >
        <AppIcon :name="getCurrentIcon(item.type)"> </AppIcon>
        <div class="toast__text">
          {{ item.text }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import type { ToastMessage } from "@/plugins/plugins.types";
import AppIcon from "./AppIcon.vue";

const ICONS_TYPES = {
  error: "IconError",
  info: "IconInfo",
} as const;

export default defineComponent({
  components: {
    AppIcon,
  },

  setup() {
    const toasts = inject<ToastMessage[]>("toasts", []);
    const getCurrentIcon = (type: "error" | "info") => {
      return ICONS_TYPES[type];
    };
    return {
      toasts,
      getCurrentIcon,
    };
  },
});
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 1000;
}
.toast {
  padding: 20px;
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: 4px;
  padding: 12px;
  &__text {
    font-size: 17px;
    white-space: pre-wrap;
    flex-shrink: 0;
  }
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &.error {
    background-color: #dc4c64;
    color: #fcf6f5ff;
  }
  &.info {
    background-color: #3b71ca;
    color: #fcf6f5ff;
  }
}
.toast-move, /* apply transition to moving elements */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.toast-leave-active {
  position: absolute;
}
</style>
