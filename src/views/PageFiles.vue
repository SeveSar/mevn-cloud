<template>
  <div class="files-page">
    <UploaderFile ref="fileUploaderRef" />
    <BaseModal ref="modalRef">
      <template #body>
        <form class="form" @submit.prevent="createFolder">
          <BaseInput
            placeholder="Name of folder"
            v-model="inputText"
          ></BaseInput>
          <BaseButton role="submit" color="border"> Create </BaseButton>
        </form>
      </template>
    </BaseModal>
    <AppLoader class="disk__loader" v-if="isLoader" />
    <div class="container">
      <div
        class="disk"
        v-if="!isDragEnter"
        @dragenter="onDragEnterHandler"
        @dragover="onDragEnterHandler"
        @dragleave="onDragLeaveHandler"
      >
        <div class="disk__header">
          <div class="disk__actions">
            <div class="disk__actions-top">
              <BaseButton class="border disk__back" @click="backNavigate">
                Back
              </BaseButton>
            </div>
            <div class="disk__actions-bottom">
              <BaseButton class="border disk__back" @click="openModal">
                Create new folder
              </BaseButton>

              <div class="disk__upload">
                <FileUpload @upload="uploadFiles" />
                <span class="disk__upload-text">or Drag and Drop files</span>
              </div>
              <div class="disk__sort">
                <div class="disk__sort-wrap">
                  <AppSelect
                    :options="Object.values(sortOptions)"
                    :sortSelect="sortSelect"
                    @update:sortSelect="updateSortSelect"
                  />
                  <div class="disk__view">
                    <button
                      class="disk__view-btn disk__view-btn--list"
                      @click="viewType = 'list'"
                    >
                      <AppIcon name="IconList"></AppIcon>
                    </button>
                    <button
                      class="disk__view-btn disk__view-btn--plate"
                      @click="viewType = 'plate'"
                    >
                      <AppIcon name="IconPlate"></AppIcon>
                    </button>
                  </div>
                </div>
                <div class="disk__search">
                  <BaseInput
                    v-model="inputSearch"
                    placeholder="Search by name"
                  ></BaseInput>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FileList
          v-if="pageFiles.length"
          :files="pageFiles"
          :view="viewType"
          @onDblclickItem="openFolder"
          @onClickDeleteItem="removeFile"
        />
      </div>
      <DropArea
        v-else
        @onDragEnter="onDragEnterHandler"
        @onDragOver="onDragEnterHandler"
        @onDragLeave="onDragLeaveHandler"
        @onDrop="uploadFiles"
      ></DropArea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, inject, watch } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import FileList from "@/components/disk/FileList/FileList.vue";
import { api } from "@/api/api";
import DropArea from "@/components/common/DropArea.vue";
import type { IFile } from "@/models/IFile";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { useRoute, useRouter } from "vue-router";
import { useDragDrop } from "@/composables/dragDrop";
import { useLoader } from "@/composables/loader";
import FileUpload from "@/components/common/FileUpload.vue";
import UploaderFile from "@/components/disk/UploaderFile/UploaderFile.vue";
import AppSelect from "@/components/ui/AppSelect/AppSelect.vue";
import type { SelectItem } from "@/components/ui/AppSelect/select.types";
import type { ToastMessage } from "@/plugins/plugins.types";
import { errorHandler } from "@/utils/errorHandler";
import AppLoader from "@/components/ui/AppLoader.vue";
import debounce from "@/utils/debounce";
import AppIcon from "@/components/ui/AppIcon.vue";

type SortOptionsKeys = "name" | "date" | "type";
export default defineComponent({
  components: {
    BaseButton,
    FileList,
    BaseModal,
    DropArea,
    BaseInput,
    FileUpload,
    UploaderFile,
    AppSelect,
    AppLoader,
    AppIcon,
  },

  setup() {
    //State
    const pageFiles = ref<IFile[]>([]);
    const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);
    const inputText = ref("");
    const route = useRoute();
    const router = useRouter();
    const fileUploaderRef = ref<InstanceType<typeof UploaderFile> | null>();
    const dirStack = ref<string[]>([]);
    const inputSearch = ref("");
    const viewType = ref("list");
    let currentDir: string | null = null;
    const sortOptions: Record<SortOptionsKeys, SelectItem> = {
      name: { text: "By name", value: "name" },
      date: { text: "By date", value: "date" },
      type: { text: "By type", value: "type" },
    };
    const sortSelect = ref<SelectItem>({ text: "Sorting", value: "" });
    const showToast = inject("showToast") as (message: ToastMessage) => {};
    // composables
    const { onDragLeaveHandler, onDragEnterHandler, isDragEnter } =
      useDragDrop();
    const { showLoader, hideLoader, isLoader } = useLoader();

    // Methods
    function init() {
      const paramsDirId = route.params.dirId as string;
      const querySort = route.query.sort as SortOptionsKeys;
      currentDir = paramsDirId ? paramsDirId : null;
      sortSelect.value = querySort ? sortOptions[querySort] : sortSelect.value;
    }
    init();
    const openModal = () => {
      modalRef.value?.show();
    };

    const createFolder = async () => {
      if (!inputText.value) {
        return false;
      }
      try {
        const res = await api.files.createDir(inputText.value, currentDir);
        if (!res) {
          return false;
        }
        pageFiles.value.unshift(res);
        modalRef.value?.close();
        inputText.value = "";
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      }
    };

    const fetchFiles = async () => {
      try {
        showLoader();
        currentDir = route.params.dirId ? (route.params.dirId as string) : null;
        const res = await api.files.getFiles(currentDir, sortSelect.value);
        if (!res) return false;
        pageFiles.value = res;
      } catch (e) {
        console.log(e);
      } finally {
        hideLoader();
      }
    };

    const openFolder = async (file: IFile) => {
      if (file.type !== "dir") {
        await api.files.downloadFile(file);
        return false;
      }
      if (file.parent) {
        dirStack.value.push(file.parent);
      }
      router.push({
        params: { dirId: file._id },
        query: sortSelect.value.value ? { sort: sortSelect.value.value } : {},
      });
      currentDir = file._id;
    };
    const backNavigate = () => {
      let backDirId = dirStack.value.pop();
      router.push({ params: { dirId: backDirId } });
    };

    const uploadFiles = async (files: File[]) => {
      try {
        fileUploaderRef.value?.open();
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const res = await api.files.uploadFile(currentDir, file);
          if (!res) continue;
          pageFiles.value.unshift(res);
        }
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      } finally {
        isDragEnter.value = false;
      }
    };
    const updateSortSelect = (value: SelectItem) => {
      if (value.value !== sortSelect.value.value) {
        sortSelect.value = value;
        router.push({ query: { sort: sortSelect.value.value } });
      }
    };
    const removeFile = async (id: string) => {
      try {
        await api.files.removeFile(id);
        pageFiles.value = pageFiles.value.filter((file) => file._id !== id);
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      }
    };
    const searchFiles = async () => {
      try {
        showLoader();
        if (inputSearch.value) {
          const files = await api.files.searchFiles(inputSearch.value);
          pageFiles.value = [...files];
        } else {
          fetchFiles();
        }
      } catch (e) {
        console.log(e);
      } finally {
        hideLoader();
      }
    };
    const getAllUsers = () => {
      api.auth.getUsers();
    };

    // Watches
    watchEffect(fetchFiles);
    watch(inputSearch, debounce(searchFiles));

    return {
      viewType,
      pageFiles,
      inputText,
      openModal,
      modalRef,
      createFolder,
      openFolder,
      dirStack,
      backNavigate,
      updateSortSelect,
      isDragEnter,
      onDragLeaveHandler,
      onDragEnterHandler,
      uploadFiles,
      fileUploaderRef,
      sortOptions,
      getAllUsers,
      sortSelect,
      isLoader,
      inputSearch,
      removeFile,
    };
  },
});
</script>

<style scoped lang="scss">
.files-page {
  height: 100%;
  padding: 45px 0;
}
.disk {
  // padding: 45px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &-bottom {
      display: flex;
      margin-top: 18px;
      width: 100%;
      align-items: flex-start;
    }
  }
  &__header {
    margin-bottom: 30px;
  }

  .form-upload {
    margin-left: 15px;
  }
  &__upload {
    display: flex;
    align-items: center;
    &-text {
      margin-left: 10px;
    }
  }
  &__sort {
    margin-left: auto;
    &-wrap {
      display: flex;
      align-items: center;
    }
  }
  &__search {
    margin-top: 15px;
  }
  &__view {
    display: flex;
    align-items: center;
    margin-left: 35px;
    &-btn {
      width: 20px;
      height: 20px;
      &:not(:last-child) {
        margin-right: 15px;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.container {
  height: 100%;
}
.form {
  display: flex;

  flex-direction: column;
  .form-group {
    margin-bottom: 15px;
  }
  .button {
    align-self: flex-end;
  }
}
</style>
