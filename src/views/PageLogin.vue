<template>
  <div class="login">
    <AuthForm
      title="Authorization"
      :isButtonDisabled="isButtonDisabled"
      @on-submit="signIn"
    >
    </AuthForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import { useRouter } from "vue-router";
import { errorHandler } from "@/utils/errorHandler";
import type { ToastMessage } from "@/plugins/plugins.types";
export default defineComponent({
  components: {
    AuthForm,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isButtonDisabled = ref(false);
    const showToast = inject("showToast") as (message: ToastMessage) => {};
    const signIn = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        isButtonDisabled.value = true;
        await authStore.login(email, password);
        router.push({ name: "index" });
      } catch (e) {
        const message = errorHandler(e) || "Unknown";
        showToast({ type: "error", text: message });
      } finally {
        isButtonDisabled.value = false;
      }
    };
    return {
      signIn,
      isButtonDisabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
}
</style>
