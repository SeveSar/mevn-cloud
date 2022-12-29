<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected?.text }}
    </div>
    <div class="items" :class="{ hide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('update:sortSelect', option);
        "
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import type { SelectItem } from "./select.types";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<Array<SelectItem>>,
      required: true,
    },
    sortSelect: {
      type: Object as PropType<SelectItem>,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup(props) {
    const selected = ref<SelectItem>(
      props.sortSelect ? props.sortSelect : props.options[0]
    );
    const open = ref(false);
    return {
      selected,
      open,
    };
  },
});
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 35px;
  line-height: 35px;
  max-width: 315px;
}

.custom-select .selected {
  padding-left: 1em;
  border: 1px solid #666666;
  cursor: pointer;
  user-select: none;
  font-weight: 400;
  height: 100%;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  padding-right: 35px;
  position: relative;
  min-width: 150px;
  svg {
    position: absolute;
    right: 13.5px;
    z-index: 1;
    transition: all 0.3s ease;
  }
}

.custom-select .selected.open {
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  transform: translateY(-20%);
  transition: all 0.1s ease;
  border-color: $main-color transparent transparent transparent;
}
.custom-select .selected.open::after {
  transform: translateY(-40%) rotate(-180deg);
}
.custom-select .items {
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  background-color: $white-color;
  border-right: 1px solid $main-color;
  border-left: 1px solid $main-color;
  border-bottom: 1px solid $main-color;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  transition: all 0.3s ease;
  z-index: 1;
}

.custom-select .items div {
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.custom-select .items div:hover {
  background-color: $main-color;
  color: $white-color;
}

.hide {
  visibility: hidden;
  opacity: 0;
}
</style>
