<template>
  <div class="register">
    <AuthForm
      :isButtonDisabled="isButtonDisabled"
      title="Registration"
      @onSubmit="signUp"
    >
    </AuthForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import type { ToastMessage } from "@/plugins/plugins.types";
import { errorHandler } from "@/utils/errorHandler";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    AuthForm,
  },

  setup() {
    const showToast = inject("showToast") as (message: ToastMessage) => {};
    const authStore = useAuthStore();
    const router = useRouter();
    const isButtonDisabled = ref(false);
    const signUp = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        isButtonDisabled.value = true;
        await authStore.signUp(email, password);
        showToast({ type: "info", text: "Registration success" });
        router.push({ name: "index" });
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      } finally {
        isButtonDisabled.value = false;
      }
    };
    return {
      signUp,
      isButtonDisabled,
    };
  },
});
</script>

<style scoped lang="scss">
.register {
  height: 100%;
  display: flex;
}
</style>
