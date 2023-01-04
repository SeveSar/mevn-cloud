<template>
  <form class="form" @submit="onSubmit">
    <h3 class="form__title">
      {{ title }}
    </h3>
    <div class="form__controls">
      <BaseInput
        type="email"
        v-model="email"
        @onFocus="resetFields()"
        placeholder="Enter your e-mail"
        :error="meta.touched ? errorEmail : null"
      ></BaseInput>

      <BaseInput
        type="password"
        v-model="password"
        @onFocus="resetFields()"
        placeholder="Enter your password"
        :error="meta.touched ? errorPass : null"
      ></BaseInput>
    </div>
    <div class="form__footer">
      <BaseButton :isLoading="isButtonDisabled" role="submit"
        >SUBMIT</BaseButton
      >
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

import { useForm, useField } from "vee-validate";
export default defineComponent({
  emits: ["onSubmit"],
  props: {
    title: {
      type: String,
      default: "",
    },
    isButtonDisabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseInput,
    BaseButton,
  },
  setup(props, { emit }) {
    const { handleSubmit, submitCount, isSubmitting, meta, resetForm } =
      useForm();
    const { value: email, errorMessage: errorEmail } = useField<string>(
      "email",
      "email"
    );

    const { value: password, errorMessage: errorPass } = useField<string>(
      "password",
      "password"
    );

    const resetFields = () => {
      resetForm({ values: { email: email.value, password: password.value } });
    };
    const onSubmit = handleSubmit((values) => {
      emit("onSubmit", values);
    });
    return {
      handleSubmit,
      email,
      errorEmail,
      onSubmit,
      isSubmitting,
      password,
      resetFields,
      errorPass,
      submitCount,
      meta,
    };
  },
});
</script>

<style scoped lang="scss">
.form {
  background: #ffffff;
  border-radius: 27px;
  max-width: 537px;
  box-shadow: 0 0 10px rgb(83, 81, 81);
  overflow: hidden;
  padding: 30px;
  width: 100%;
  margin: auto;
  &__footer {
    display: flex;
  }
}
.form-group:not(:last-child) {
  margin-bottom: 10px;
}

.button {
  margin-top: 25px;
  margin-left: auto;
}
</style>
