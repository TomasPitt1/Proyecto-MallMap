import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAKJ_0qJr5t-2zSSqXeBG0oCL2j1ctUUyA",
  authDomain: "mallmap-64ecb.firebaseapp.com",
  databaseURL: "https://mallmap-64ecb-default-rtdb.firebaseio.com",
  projectId: "mallmap-64ecb",
  storageBucket: "mallmap-64ecb.firebasestorage.app",
  messagingSenderId: "537237374281",
  appId: "1:537237374281:web:b5908ef331a1cb93d3c698",
  measurementId: "G-LYCMZWTE9S",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);
