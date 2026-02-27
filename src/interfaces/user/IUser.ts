import type { IUserInfo } from "@/interfaces";

export interface IUser extends IUserInfo {
  uid: number | string;
  displayName: string;
}