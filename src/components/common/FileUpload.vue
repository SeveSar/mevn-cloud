<template>
  <div class="form-upload">
    <input id="file" multiple @change="onChangeHandler" type="file" />
    <label for="file"> Upload file </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const onChangeHandler = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        emit("upload", [...files]);
      }
      target.value = "";
    };
    return {
      onChangeHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.form-upload {
  input {
    display: none;
  }

  label {
    display: inline-block;
    border: 2px dashed $main-color;
    padding: 6px 15px;
    transition: all 0.2s linear;
    max-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    cursor: pointer;
    color: #566885;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
