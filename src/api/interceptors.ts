import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import axios from "axios";
import type { AuthResponse } from "@/models/response/AuthResponse";
import { useAuthStore } from "@/store/auth";
import router from "@/router/index";

import { getAccessToken, setToken } from "@/utils/tokenHelper";
enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}
interface ConfigImplements extends AxiosRequestConfig {
  _isRetry?: boolean;
}
let refreshTokenRequest: Promise<AxiosResponse<AuthResponse>> | null = null;
const errorHandler = async (error: AxiosError) => {
  const authStore = useAuthStore();
  const response = error.response;
  const config = error.config as ConfigImplements;

  if (!response) {
    return Promise.reject("Unknown Error");
  }
  const { status } = response;
  switch (status) {
    case StatusCode.Unauthorized: {
      if (config && !config._isRetry) {
        config._isRetry = true;
        try {
          if (refreshTokenRequest === null) {
            refreshTokenRequest = axios.get<AuthResponse>("/api/auth/refresh", {
              baseURL: import.meta.env.VITE_BASE_URL,
              withCredentials: true,
            });
          }
          const res = await refreshTokenRequest;
          refreshTokenRequest = null;
          setToken(res.data.accessToken);

          return axios(setTokenHeaders(config));
        } catch (e) {
          authStore.logOut().then(() => {
            router.push("/login");
          });
        }
      }
      authStore.logOut().then(() => {
        router.push("/login");
      });
    }
  }
  return Promise.reject(error);
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse> => {
  return errorHandler(error);
};

const onResponseSuccess = (successRes: AxiosResponse): AxiosResponse => {
  return successRes;
};

const urlsSkipAuth = [
  "/api/auth/login",
  "/api/auth/logout",
  // "/api/auth/refresh",
];
const setTokenHeaders = (config: AxiosRequestConfig) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config;
  }
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export default function (http: AxiosInstance) {
  http.interceptors.request.use(setTokenHeaders);
  http.interceptors.response.use(onResponseSuccess, onResponseError);
}
