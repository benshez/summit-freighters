import type { IRole } from "@/interfaces";

export interface IUserInfo {
  email: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  phoneNumber?: string;
  photoUrl?: string;
  roles?: IRole;
  accessToken?: string;
}