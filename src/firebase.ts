import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXAvbtHsc_KjIsz3m7h0e0XFUNsB_EVb8",
  authDomain: "perfectday-8e535.firebaseapp.com",
  projectId: "perfectday-8e535",
  storageBucket: "perfectday-8e535.firebasestorage.app",
  messagingSenderId: "512942520784",
  appId: "1:512942520784:web:5afbd47963cff69588a1d5",
  measurementId: "G-3ZZLV3F6VX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
