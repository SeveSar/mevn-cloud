import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";
import "@/utils/validations";
import "./assets/main.scss";
import { toast } from "@/plugins/toast";
import { useAuthStore } from "@/store/auth";

const app = createApp(App);

async function init() {
  app.use(createPinia());
  await useAuthStore().auth();
  app.use(router);
  app.use(toast);
  app.mount("#app");
}

init();
