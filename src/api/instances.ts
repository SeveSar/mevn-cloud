import axios from "axios";
import type { AxiosInstance } from "axios";
import initInterceptors from "./interceptors";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

initInterceptors(instance);

export default instance;
