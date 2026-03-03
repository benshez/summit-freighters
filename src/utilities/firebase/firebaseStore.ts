import {
  type FirestoreDataConverter,
  type DocumentData,
  type SnapshotOptions,
  QueryDocumentSnapshot,
  collection
} from "firebase/firestore";
import { useFirebase } from "@/utilities";
import { type IUser } from "@/interfaces";

const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => data as DocumentData,
  fromFirestore: (snapshot: QueryDocumentSnapshot, options?: SnapshotOptions) =>
    snapshot.data() as T
});

const dataPoint = <T>(path: string) => collection(useFirebase().firebaseApp, path).withConverter(converter<T>());

const firebaseStore = {
  user: dataPoint<IUser>("user")
}

export {
  firebaseStore,
}