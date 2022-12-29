<template>
  <div class="profile">
    <div class="profile__card">
      <h2 class="profile__title">Choose your avatar</h2>
      <div class="profile__avatar">
        <AvatarUpload
          :avatarSrc="user?.avatar"
          @upload="uploadAvatar"
          class="profile__avatar"
        />
        <BaseButton
          class="profile__avatar-delete"
          @click="deleteAvatar"
          :disabled="isLoading"
          v-if="user?.avatar"
        >
          Удалить
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { storeToRefs } from "pinia";
import AvatarUpload from "@/components/common/AvatarUpload.vue";

import { useAuthStore } from "@/store/auth";
import type { ToastMessage } from "@/plugins/plugins.types";
import { errorHandler } from "@/utils/errorHandler";
import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  components: {
    AvatarUpload,
    BaseButton,
  },
  setup() {
    const isLoading = ref(false);
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const showToast = inject("showToast") as (message: ToastMessage) => {};
    const uploadAvatar = async (file: File) => {
      try {
        await authStore.uploadAvatar(file);
      } catch (e) {
        const message = errorHandler(e) || "Error upload avatar";
        showToast({ type: "error", text: message });
      }
    };
    const deleteAvatar = async () => {
      try {
        isLoading.value = true;
        await authStore.deleteAvatar();
      } catch (e) {
        console.log(e, "e");
        const message = errorHandler(e) || "Error upload avatar";
        showToast({ type: "error", text: message });
      } finally {
        isLoading.value = false;
      }
    };
    return {
      uploadAvatar,
      user,
      deleteAvatar,
      isLoading,
    };
  },
});
</script>

<style scoped lang="scss">
.profile {
  text-align: center;
  display: flex;
  height: 100%;
  &__card {
    margin: auto;
    max-width: 500px;
    width: 100%;
    padding: 50px 25px;
    background-color: $white-color;
    border-radius: 12px;
  }
  &__avatar {
    margin: 0 auto;
    &-delete {
      margin-top: 15px;
    }
  }
  &__title {
    margin-bottom: 25px;
  }
}
</style>