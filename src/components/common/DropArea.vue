<template>
  <div
    class="drop-area"
    @drop="onDropHandler"
    @dragenter="$emit('onDragEnter', $event)"
    @dragover="$emit('onDragOver', $event)"
    @dragleave="$emit('onDragLeave', $event)"
  >
    <h2 class="drop-area__title">Drag & Drop to Upload file</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["onDragEnter", "onDragOver", "onDragLeave", "onDrop"],
  setup(props, { emit }) {
    const onDropHandler = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const files: File[] = [...(event.dataTransfer?.files || [])];
      emit("onDrop", files);
    };
    return {
      onDropHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.drop-area {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px dashed $main-color;
  h2 {
    font-size: 35px;
  }
}
</style>
