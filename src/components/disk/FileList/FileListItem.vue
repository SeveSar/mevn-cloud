<template>
  <div class="file" v-if="view === 'list'">
    <AppIcon
      :name="file.type === 'dir' ? 'IconFolder' : 'IconFile'"
      class="file__img"
    />
    <div class="file-name file__name">{{ file.name }}</div>
    <div class="file-date file__date">{{ file.date.slice(0, 10) }}</div>
    <div class="file-size file__size">{{ bytesForHuman(file.size) }}</div>
    <button
      class="file-btn file__btn file__download file-download"
      v-if="file.type !== 'dir'"
      @click="$emit('onClickDownload')"
    >
      <AppIcon name="IconDownload"></AppIcon>
    </button>
    <button
      class="file-btn file__btn file-delete file__delete"
      @click="$emit('onClickDelete')"
    >
      <AppIcon name="IconTrash"></AppIcon>
    </button>
  </div>
  <div class="file-plate" v-else-if="view === 'plate'">
    <div class="file-plate__img">
      <AppIcon
        :name="file.type === 'dir' ? 'IconFolder' : 'IconFile'"
        class="file-plate__img"
      />
    </div>
    <div class="file-name">
      {{ file.name }}
    </div>
    <div class="file-plate__actions">
      <button
        class="file-btn file-plate__btn file-download file-plate__download"
        v-if="file.type !== 'dir'"
        @click="$emit('onClickDownload')"
      >
        <AppIcon name="IconDownload"></AppIcon>
      </button>
      <button
        class="file-btn file-plate__btn file-delete file-plate__delete"
        @click="$emit('onClickDelete')"
      >
        <AppIcon name="IconTrash"></AppIcon>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type { IFile } from "@/models/IFile";

import { defineComponent, type PropType } from "vue";
import AppIcon from "@/components/ui/AppIcon.vue";
import { bytesForHuman } from "@/utils/convertBytes";

export default defineComponent({
  props: {
    file: {
      type: Object as PropType<IFile>,
      required: true,
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
    AppIcon,
  },
  methods: {
    bytesForHuman,
  },
});
</script>

<style scoped lang="scss">
.file {
  cursor: pointer;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  display: grid;
  grid-template-columns: 1fr 4fr repeat(4, 1fr);
  align-items: center;
  border-bottom: 2px solid $main-color;
  padding-bottom: 5px;
  margin: 10px 0;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    .file__btn {
      display: block;
    }
    .file__date {
      grid-column-start: 3;
    }
    .file__size {
      grid-column-start: 4;
    }
  }
  &__img {
    justify-self: center;
  }
  &__name {
    grid-column-start: 2;
  }
  &__btn {
    display: none;
  }
  &__date {
    grid-column-start: 5;
    justify-self: center;
  }
  &__size {
    grid-column-start: 6;
    justify-self: center;
  }

  &__download {
    grid-column-start: 5;
  }
  &__delete {
    grid-column-start: 6;
  }
}
.file-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.file-download {
  svg {
    fill: $main-color;
  }
}
.file-btn {
  svg {
    width: 25px;
    height: 25px;
  }
}
.file-plate {
  cursor: pointer;
  position: relative;
  &__img {
    width: 100px;
    height: 100px;
  }
  &:hover {
    .file-plate__actions {
      display: flex;
      position: absolute;
      width: 100%;
    }
  }
  &__actions {
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    display: none;
  }
}
</style>
