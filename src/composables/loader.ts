import { ref, readonly } from "vue";

export function useLoader() {
  const isLoader = ref(false);
  const showLoader = () => {
    isLoader.value = true;
  };
  const hideLoader = () => {
    isLoader.value = false;
  };
  return {
    isLoader: readonly(isLoader),
    showLoader,
    hideLoader,
  };
}
