<template>
  <BaseModal ref="modalRef">
    <template #body>
      <form class="form" @submit.prevent="onSubmitForm">
        <BaseInput placeholder="Name of folder" v-model="inputText"></BaseInput>
        <BaseButton :isLoading="isLoading" role="submit" color="border">
          Create
        </BaseButton>
      </form>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, inject, type PropType } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import { api } from "@/api/api";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { errorHandler } from "@/utils/errorHandler";
import type { ToastMessage } from "@/plugins/plugins.types";
import { useFilesStore } from "@/store/files";
export default defineComponent({
  components: {
    BaseInput,
    BaseButton,
    BaseModal,
  },
  setup(props, { emit }) {
    const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);
    const inputText = ref("");
    const isLoading = ref(false);
    const showToast = inject("showToast") as (message: ToastMessage) => {};
    const filesStore = useFilesStore();

    //methods
    const reset = () => {
      inputText.value = "";
      isLoading.value = false;
    };

    const onSubmitForm = async () => {
      if (!inputText.value) {
        return false;
      }
      isLoading.value = true;
      try {
        await filesStore.createFolder(inputText.value);
        modalRef.value?.close();
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      } finally {
        reset();
      }
    };

    return {
      inputText,
      modalRef,
      onSubmitForm,
      reset,
      isLoading,
    };
  },
});
</script>

<style scoped lang="scss">
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
