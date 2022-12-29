import type { IUser } from "../IUser";
export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
