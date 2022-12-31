import { ref } from "vue";

import type { ToastMessage } from "./plugins.types";
export const toast = {
  install: (app: any, options: any) => {
    let id = 0;
    // inject a globally available $translate() method
    const toasts = ref<ToastMessage[]>([]);
    const showToast = (message: ToastMessage) => {
      id++;
      const newMessage: ToastMessage = {
        ...message,
        id,
      };
      toasts.value.unshift(newMessage);

      setTimeout(() => {
        removeToast(newMessage.id || 0);
      }, 3000);
    };
    const removeToast = (idToast: string | number) => {
      toasts.value = toasts.value.filter((item) => item.id !== idToast);
      id--;
    };
    app.provide("showToast", showToast);
    app.provide("toasts", toasts);
  },
};
