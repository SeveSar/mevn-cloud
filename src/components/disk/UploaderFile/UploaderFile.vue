<template>
  <div class="uploader" v-if="isOpen">
    <div class="uploader__header">
      <div class="uploader__title">Uploads</div>
      <button class="uploader__close" @click="close">X</button>
    </div>
    <div class="uploader__list">
      <UploaderFileItem v-for="file in files" :file="file" :key="file.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UploaderFileItem from "./UploaderFileItem.vue";
import { useUploaderStore } from "@/store/uploader";
import { storeToRefs } from "pinia";
export default defineComponent({
  components: {
    UploaderFileItem,
  },
  setup() {
    const uploaderStore = useUploaderStore();
    const { files } = storeToRefs(uploaderStore);
    const isOpen = ref(false);
    //methods
    const open = () => {
      isOpen.value = true;
    };
    const close = () => {
      isOpen.value = false;
      console.log("clsoese");
    };
    return {
      isOpen,
      files,
      open,
      close,
    };
  },
});
</script>

<style scoped lang="scss">
.uploader {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 300px;
  width: 300px;
  background-color: $main-color;
  padding: 20px;
  border-radius: 12px;
  z-index: 555;
  overflow: auto;
  &__header {
    margin-bottom: 20px;
  }
  &__close {
    position: absolute;
    color: $white-color;
    right: 20px;
    top: 20px;
    font-size: 18px;
  }
  &__title {
    font-size: 20px;
    color: $white-color;
  }
}
</style>
