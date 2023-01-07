import { getAccessToken } from "@/utils/tokenHelper";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";
import "@/utils/validations";
import "./assets/scss/main.scss";
import { toast } from "@/plugins/toast";
import { useAuthStore } from "@/store/auth";
const app = createApp(App);

async function init() {
  app.use(createPinia());
  if (getAccessToken()) {
    await useAuthStore().auth();
  }
  const initLoader = document.getElementById("init-loader");
  if (initLoader) {
    initLoader.style.display = "none";
  }
  app.use(router);
  app.use(toast);
  app.mount("#app");
}

init();
