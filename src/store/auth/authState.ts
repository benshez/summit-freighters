import type { IAuthState, IRole, IUser } from "@/interfaces";

class authenticationState implements IAuthState {

  readonly userInfo?: IUser = {} as IUser | undefined;
  readonly isAuthenticated: boolean | undefined = undefined;

  // constructor(userInfo: IUser = {} as IUser) {
  //   if (userInfo) {
  //     this.userInfo = userInfo;
  //     this.isAuthenticated = this.userInfo?.uid !== undefined && this.userInfo?.emailVerified === true && this.userInfo?.accessToken !== undefined;
  //   }
  // }
  
  GetUserInfo = (): IUser => {
   return this.userInfo as IUser;
  };

  GetIsAuthenticated = (): boolean | undefined => {
    return this.isAuthenticated;
  }

}

export const authState = new authenticationState();