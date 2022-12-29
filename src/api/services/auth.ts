import type { AxiosInstance } from "axios";
import type { AuthResponse } from "@/models/response/AuthResponse";
import axios from "axios";

class AuthService {
  private readonly http: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.http = axiosInstance;
  }
  async register(email: string, password: string) {
    const res = await this.http.post<AuthResponse>("/api/auth/registration", {
      email,
      password,
    });
    return res.data;
  }

  async login(email: string, password: string) {
    const res = await this.http.post<AuthResponse>("/api/auth/login", {
      email,
      password,
    });

    return res.data;
  }

  async checkAuth() {
    const res = await axios.get<AuthResponse>("/api/auth/refresh", {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
    return res.data;
  }
  async getUsers() {
    const res = await this.http.get<any>("/users");
    return res.data;
  }
  async logOut() {
    const res = await axios.get("/api/auth/logout", {
      baseURL: import.meta.env.VITE_BASE_URL,
      withCredentials: true,
    });
    return res;
  }
}
export default AuthService;
