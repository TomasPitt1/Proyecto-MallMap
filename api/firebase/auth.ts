import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "./config";

export const firebaseRegister = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const firebaseLogin = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const firebaseLogout = () => signOut(auth);

export const listenAuth = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);
