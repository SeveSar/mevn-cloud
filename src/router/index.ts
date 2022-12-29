import { createRouter, createWebHistory } from "vue-router";
import { RouteNamesEnum } from "./router.types";
import { authMiddleware } from "./middleware/auth.middleware";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:dirId?",
      name: RouteNamesEnum.index,
      component: () => import("../views/PageFiles.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/login",
      name: RouteNamesEnum.login,
      component: () => import("../views/PageLogin.vue"),
    },
    {
      path: "/register",
      name: RouteNamesEnum.register,
      component: () => import("../views/PageRegister.vue"),
    },
    {
      path: "/profile",
      name: RouteNamesEnum.profile,
      component: () => import("../views/PageProfile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(authMiddleware);
export default router;
