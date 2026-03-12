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
  type Auth,
} from "firebase/auth";
import { configuration } from "@/utilities";

export const useFirebase = () => {
  const app: FirebaseApp = initializeApp(configuration.GetFirebaseConfiguration() as FirebaseOptions);
  const firebaseApp: Firestore = getFirestore(app);
  const auth: Auth = getAuth(app);

  return {
    app,
    firebaseApp,
    auth
  }
}