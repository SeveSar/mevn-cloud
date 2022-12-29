import { computed, toRefs, reactive } from "vue";
import { defineStore } from "pinia";
import { api } from "@/api/api";
import { setToken, getAccessToken, cleanTokensData } from "@/utils/tokenHelper";
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
    if (!getAccessToken()) {
      return false;
    }
    try {
      const data = await api.auth.checkAuth();
      state.user = data.user;
      state.token = data.accessToken;
      setToken(data.accessToken);
    } catch (e) {
      cleanTokensData();
      console.log(e);
    }
  }
  async function uploadAvatar(file: File) {
    const user = await api.files.uploadAvatar(file);
    state.user = user;
  }

  async function deleteAvatar() {
    const user = await api.files.deleteAvatar();
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
    uploadAvatar,
    deleteAvatar,
    isLoggedIn,
    user,
    logOut,
    auth,
    token,
  };
});