import { ref } from "vue";
import { defineStore } from "pinia";
import type { IFileUpload } from "@/models/IFileUpload";

export const useUploaderStore = defineStore("uploader", () => {
  //state
  const files = ref<IFileUpload[]>([]);

  //methods
  const addFile = (file: IFileUpload) => {
    files.value.unshift(file);
  };
  const removeFile = (id: number | string) => {
    files.value = files.value.filter((file) => file.id !== id);
  };
  const updateFile = (fileUpload: IFileUpload) => {
    files.value = files.value.map((file) => {
      if (file.id === fileUpload.id) {
        return {
          ...file,
          progress: fileUpload.progress,
        };
      }
      return file;
    });
  };
  return { files, addFile, removeFile, updateFile };
});
