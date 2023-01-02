import type { RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/store/auth";

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): void | { name: string } {
  const requiredAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(to);
  const userIsAuth = useAuthStore().isLoggedIn;
  if (requiredAuth && !userIsAuth) {
    return { name: "login" };
  } else if (!requiredAuth && userIsAuth && to.name === "login") {
    return { name: "index" };
  }
}
