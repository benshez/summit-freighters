import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  getAuth,
  updatePassword,
  updateEmail,
  updateProfile,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,

  signOut
} from "firebase/auth";
import { useFirebase } from "@/utilities/firebase/useFirebase";
import { appStore } from "@/utilities";
import { authState } from "@/store";
import { configuration } from "@/utilities";
import type { IAuthState, IUser } from "@/interfaces";

class AuthStore extends appStore<IAuthState> {
  data(): IAuthState {
    return {
      userInfo: authState.GetUserInfo(),
      isAuthenticated: authState.GetIsAuthenticated()
    };
  }

  GetUserInfo = async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(useFirebase().auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
    this.UpdateUserInfo();
  }

  CreateUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(useFirebase().auth, email, password);

    this.UpdateUserInfo();
  }

  SendVerificationEmail = async () => {
    const user = useFirebase().auth?.currentUser;

    if (user) {
      await sendEmailVerification(user);
    }
  }

  UpdateUserPassword = async (newPassword: string) => {
    const user = useFirebase().auth?.currentUser;

    if (user) {
      await updatePassword(user, newPassword);
    }
  }

  ResetUserPassword = async (email: string) => {
    const user = useFirebase().auth.currentUser;
    const password = this.GenerateSecureRandomPassword();

    if (user) {
      await this.UpdateUserPassword(password);
      await this.SendUserPasswordResetEmail(email);
    }
  }

  SendUserPasswordResetEmail = async (email: string) => {
    await sendPasswordResetEmail(useFirebase().auth, email);
  }

  UpdateUserEmail = async (newEmail: string) => {
    const user = useFirebase().auth?.currentUser;

    if (user) {
      await updateEmail(user, newEmail);
      await this.UpdateUserInfo();
    }
  }

  UpdateUserProfile = async (profile: {}) => {
    const user = useFirebase().auth?.currentUser;

    if (user) {
      await updateProfile(user, profile);
      await this.UpdateUserInfo();
    }
  }

  GenerateSecureRandomPassword = () => {
    const uppercases = "abcdefghijklmnopqrstuvwxyz"
    const lowercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const sympbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    const charset = uppercases + lowercases + numbers + sympbols;
    let password = "";

    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  }

  LoginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(useFirebase().auth, email, password);
    await this.UpdateUserInfo();
  }

  LogoutUser = async () => {
    try {
      await signOut(useFirebase().auth);
      this.state.userInfo = {} as IUser;
      this.state.isAuthenticated = false;
      this.ClearState();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  UpdateUserInfo = async () => {
    const user = useFirebase().auth?.currentUser;

    if (user) {
      authStore.Init();

      if (authStore.GetIsInitialized()) {

        const userToken = user ? await user.getIdToken() : null;
        const authedUser = {
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          phoneNumber: user.phoneNumber || "",
          photoUrl: user.photoURL || "",
          roles: { permission: ["user"], access: ["read", "write"] },
          accessToken: userToken as unknown as string,
        } as unknown as IUser;

        this.state.userInfo = authedUser;
        this.state.isAuthenticated = authedUser.uid !== undefined && authedUser.emailVerified !== undefined && authedUser.accessToken !== undefined;

        configuration.SetAuthorizationBearerToken(this.state.userInfo?.accessToken as string);
      }
    }
  }
}

export const authStore: AuthStore = new AuthStore("AuthStore");