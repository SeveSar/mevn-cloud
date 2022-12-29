declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}

export enum RouteNamesEnum {
  index = "index",
  login = "login",
  register = "register",
  profile = "profile",
}
