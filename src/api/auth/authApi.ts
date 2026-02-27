import { api } from "@/plugins";
import type { ILoginBody, IUser, IRegisterBody } from "@/interfaces";

class userAuthentication {
  constructor() { }

  Login = (body: ILoginBody): IUser => {
    return api.post<IUser, IUser>("", body) as unknown as IUser;
  }

  Register = (body: IRegisterBody): IUser => {
    return api.post("/auth/register", body) as unknown as IUser;
  }

  GetUser = (userId: string | number): IUser => {
    return null as unknown as IUser;
    // const user = {
    //   id: userId,
    //   lastName: "",
    //   username: "",
    //   email: "",
    //   firstName: "",
    //   gender: "",
    //   image: "",
    //   accessToken: "sdasdsdas",
    // }
    // return user;
    //return api.get<unknown, IUser>(`/users/${userId}`) as unknown as IUser;
  }
}

export const authApi = new userAuthentication();