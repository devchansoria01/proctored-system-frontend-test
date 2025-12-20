// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 👈 Add GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgBWP8jQPYoD9Ps4gcRVdnZyx5uiYa3dE",
  authDomain: "admin-proctored-system.firebaseapp.com",
  projectId: "admin-proctored-system",
  storageBucket: "admin-proctored-system.firebasestorage.app",
  messagingSenderId: "825425134452",
  appId: "1:825425134452:web:106bb81d9dcf1151386221"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); // 👈 Export the provider