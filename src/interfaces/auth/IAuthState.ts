import type { IRole, IUser } from "@/interfaces";

export interface IAuthState {
  userInfo?: IUser | undefined,
  isAuthenticated: boolean | undefined,
}