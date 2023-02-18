import { ref } from "vue";
export function useDragHandlers() {
  const isDragEnter = ref(false);
  let enterTarget: any = null;

  const onDragLeaveHandler = (e: Event) => {
    if (enterTarget == e.target) {
      e.stopPropagation();
      e.preventDefault();
      isDragEnter.value = false;
    }
  };
  const onDragEnterHandler = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    enterTarget = e.target;
    isDragEnter.value = true;
  };

  return {
    onDragLeaveHandler,
    onDragEnterHandler,
    isDragEnter,
  };
}
