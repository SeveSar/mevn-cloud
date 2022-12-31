<template>
  <div class="avatar-upload">
    <input
      type="file"
      id="avatar-file"
      accept="image/*"
      @change="onChangeHanlder"
      :disabled="isLoading"
    />

    <label
      for="avatar-file"
      :style="{ backgroundImage: `url(${currentImage})` }"
    >
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import defaultAvatar from "@/assets/images/user.svg";

export default defineComponent({
  props: {
    avatarSrc: {
      type: null as unknown as PropType<string | null>,
      default: null,
      validator: (v: any) => typeof v === "string" || v === null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const currentImage = computed(() => {
      return props.avatarSrc
        ? import.meta.env.VITE_BASE_URL + "/" + props.avatarSrc
        : defaultAvatar;
    });
    const onChangeHanlder = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        emit("upload", files[0]);
      }
      target.value = "";
    };
    return {
      onChangeHanlder,
      currentImage,
    };
  },
});
</script>

<style scoped lang="scss">
.avatar-upload {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;

  position: relative;
  &:hover {
    &::before {
      opacity: 1;
    }
  }
  &::before {
    content: "Choose";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white-color;
    opacity: 0;
    transition: all 0.3s linear;
    pointer-events: none;
  }
  input {
    display: none;
  }
  label {
    color: $white-color;
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
