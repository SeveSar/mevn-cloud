import { readonly, ref, toRefs } from "vue";
import { defineStore } from "pinia";
import type { IFile } from "@/models/IFile";
import { api } from "@/api/api";
// import { useLoader } from "@/composables/loader";

type TypeCurrentDir = string | null;
interface IStateFiles {
  files: IFile[];
  dirStack: string[];
  currentDir: TypeCurrentDir;
}

export const useFilesStore = defineStore("files", () => {
  //state
  const state = ref<IStateFiles>({
    files: [],
    dirStack: [],
    currentDir: null,
  });
  const { currentDir, files, dirStack } = toRefs(state.value);

  //methods
  const fetchFiles = async (sort?: string) => {
    const data = await api.files.getFiles(currentDir.value, sort);
    files.value = data;
  };
  const addFile = (file: IFile) => {
    files.value.unshift(file);
  };
  const setCurrentDir = (dirId: TypeCurrentDir) => {
    currentDir.value = dirId;
  };
  const addToDirStack = (id: string) => {
    dirStack.value.push(id);
  };
  const createFolder = async (nameFolder: string) => {
    const file = await api.files.createDir(nameFolder, currentDir.value);
    addFile(file);
  };

  const uploadFiles = async (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = await api.files.uploadFile(currentDir.value, file);
      if (!data) continue;
      addFile(data);
    }
    return true;
  };

  const removeLastFromDirStack = () => {
    const lastRemovedId = dirStack.value.pop();
    return lastRemovedId;
  };

  const searchFiles = async (input: string) => {
    const data = await api.files.searchFiles(input);
    files.value = data;
  };

  const removeFile = async (id: string) => {
    await api.files.removeFile(id);
    files.value = files.value.filter((file) => file._id !== id);
  };
  return {
    files: files,
    dirStack: readonly(dirStack),
    currentDir: readonly(currentDir),
    fetchFiles,
    createFolder,
    removeFile,
    searchFiles,
    setCurrentDir,
    addToDirStack,
    uploadFiles,
    removeLastFromDirStack,
    addFile,
  };
});
