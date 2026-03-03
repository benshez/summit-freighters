import {
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import {
  getFirestore,
  Firestore
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type Auth
  ,
  type User
} from "firebase/auth";
import { configuration } from "@/utilities";

export const useFirebase = () => {
  const app: FirebaseApp = initializeApp(configuration.GetFirebaseConfiguration() as FirebaseOptions);
  const firebaseApp: Firestore = getFirestore(app);
  const auth: Auth = getAuth(app);

  const loginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const logoutUser = async () => {
    await signOut(auth);
  }

  // const getCurrentUser = (): Promise<User> => {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //       unsubscribe();
  //       resolve(user as User);
  //     }, reject);
  //   });
  // }

  const getCurrentUser = async (): Promise<User | null> => {
    const auth = getAuth();
    await auth.authStateReady();
    return auth.currentUser;
  };

  return {
    app,
    firebaseApp,
    auth,
    loginUser,
    logoutUser,
    getCurrentUser
  }
}