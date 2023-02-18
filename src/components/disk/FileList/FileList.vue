<template>
  <div class="files">
    <transition name="fade" mode="out-in">
      <div class="filelist" v-if="view === 'list'">
        <div class="filelist__header" v-if="files.length">
          <div class="filelist__name">Name</div>
          <div class="filelist__date">Date</div>
          <div class="filelist__size">Size</div>
        </div>
        <div class="filelist__list">
          <transition-group name="file">
            <FileListItem
              v-for="file in files"
              :key="file._id"
              :file="file"
              @dblclick="$emit('onDblclickItem', file)"
              @onClickDownload="onDownloadHandler(file)"
              @onClickDelete="removeFile(file._id)"
              :isButtonBlocked="isButtonBlocked"
            ></FileListItem>
          </transition-group>
        </div>
      </div>
      <div class="filelist-plate" v-else-if="view === 'plate'">
        <div class="filelist-plate__col" v-for="file in files" :key="file._id">
          <FileListItem
            :file="file"
            :view="view"
            @dblclick="$emit('onDblclickItem', file)"
            @onClickDownload="onDownloadHandler(file)"
            :isButtonBlocked="isButtonBlocked"
            @onClickDelete="removeFile(file._id)"
          ></FileListItem>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, type PropType } from "vue";
import FileListItem from "@/components/disk/FileList/FileListItem.vue";
import type { IFile } from "@/models/IFile";
import { useFilesStore } from "@/store/files";

import { api } from "@/api/api";
import type { ToastMessage } from "@/plugins/plugins.types";
import { errorHandler } from "@/utils/errorHandler";
export default defineComponent({
  props: {
    files: {
      type: Array as PropType<IFile[]>,
      default: () => [],
    },
    view: {
      type: String,
      default: "list",
      validator(value: "list" | "plate") {
        return ["list", "plate"].includes(value);
      },
    },
  },
  components: {
    FileListItem,
  },
  setup() {
    const showToast = inject("showToast") as (message: ToastMessage) => {};
    const filesStore = useFilesStore();
    const isButtonBlocked = ref(false);

    const onDownloadHandler = (file: IFile) => {
      api.files.downloadFile(file);
    };

    const removeFile = async (id: string) => {
      isButtonBlocked.value = true;
      try {
        await filesStore.removeFile(id);
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      } finally {
        isButtonBlocked.value = false;
      }
    };
    return {
      onDownloadHandler,
      removeFile,
      isButtonBlocked,
    };
  },
});
</script>

<style scoped lang="scss">
.filelist {
  &__header {
    display: grid;
    grid-template-columns: 1fr 4fr repeat(4, 1fr);
  }
  &__name {
    grid-column-start: 2;
  }
  &__date {
    grid-column-start: 5;
    justify-self: center;
  }
  &__size {
    grid-column-start: 6;
    justify-self: center;
  }
}
.filelist-plate {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  &__col {
    padding: 0 15px 50px;
    width: calc(100% / 9);
  }
}
</style>
