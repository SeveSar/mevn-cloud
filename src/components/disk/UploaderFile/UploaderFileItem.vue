<template>
  <div class="upload-file">
    <div class="upload-file__header">
      <div class="upload-file__title">{{ file.name }}</div>
      <button
        class="upload-file__close"
        @click="uploaderStore.removeFile(file.id)"
      >
        X
      </button>
    </div>
    <div class="upload-file__progress-bar">
      <div
        class="upload-file__upload-bar"
        :style="{ width: file.progress + '%' }"
      ></div>
      <div class="upload-file__percent">{{ file.progress }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { IFileUpload } from "@/models/IFileUpload";
import { useUploaderStore } from "@/store/uploader";
export default defineComponent({
  props: {
    file: {
      type: Object as PropType<IFileUpload>,
      required: true,
    },
  },
  setup() {
    const uploaderStore = useUploaderStore();
    return {
      uploaderStore,
    };
  },
});
</script>

<style scoped lang="scss">
.upload-file {
  background-color: $white-color;
  padding: 11px 10px;
  margin: 10px 0;
  border-radius: 12px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
  }
  &__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__close {
    color: $main-color;
  }
  &__progress-bar {
    position: relative;
    border-radius: 8px;
    background-color: $main-color;
  }
  &__percent {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: $white-color;
    font-size: 14px;
  }
  &__upload-bar {
    background-color: rgb(125 204 8);
    height: 17px;
    width: 0%;
    border-radius: 8px;
  }
}
</style>
