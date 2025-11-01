import { User as FirebaseUser } from "firebase/auth";
import { User } from "@/types/userTypes";

export const convertFirebaseToAppUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName ?? "",
  email: firebaseUser.email ?? "",
  phone: null,
  password: "",
  dob: null,
  gender: null,
  isAdmin: false,
  image: firebaseUser.photoURL,
  socketId: null,
  pushToken: null,
  provider: "google",
  token: "", // can be replaced with Firebase token if needed
  isModerator: false,
  isSeller: false,
  updatePasswordAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  marital_status: null,
  anniversary_date: null,
  address: null
});
