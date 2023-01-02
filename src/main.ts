import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";
import "@/utils/validations";
import "./assets/main.scss";
import { toast } from "@/plugins/toast";
import { useAuthStore } from "@/store/auth";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(toast);
app.mount("#app");
// init();
