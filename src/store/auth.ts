import { computed, toRefs, reactive } from "vue";
import { defineStore } from "pinia";
import { api } from "@/api/api";
import { setToken, cleanTokensData } from "@/utils/tokenHelper";
import type { IUser } from "@/models/IUser";

interface StateUser {
  token: string | null;
  user: IUser | null;
}

export const useAuthStore = defineStore("auth", () => {
  const state = reactive<StateUser>({
    token: null,
    user: null,
  });
  const { token, user } = toRefs(state);
  const isLoggedIn = computed(() => !!token.value);

  async function login(email: string, password: string) {
    const data = await api.auth.login(email, password);
    state.user = data.user;
    state.token = data.accessToken;
    setToken(data.accessToken);
  }
  async function signUp(email: string, password: string) {
    const data = await api.auth.register(email, password);
    state.user = data.user;
    state.token = data.accessToken;
    setToken(data.accessToken);
    return data;
  }
  async function auth() {
    try {
      const res = await api.auth.refresh();
      if (res) {
        state.user = res.data.user;
        state.token = res.data.accessToken;
        setToken(res.data.accessToken);
      }
    } catch (e) {
      cleanTokensData();
      console.log(e);
    }
  }
  function setUser(user: IUser) {
    state.user = user;
  }
  async function logOut() {
    await api.auth.logOut();
    cleanTokensData();
    state.user = null;
    state.token = null;
  }

  return {
    login,
    signUp,
    isLoggedIn,
    user,
    logOut,
    auth,
    token,
    setUser,
  };
});
