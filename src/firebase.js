// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgBWP8jQPYoD9Ps4gcRVdnZyx5uiYa3dE",
  authDomain: "admin-proctored-system.firebaseapp.com",
  projectId: "admin-proctored-system",
  storageBucket: "admin-proctored-system.firebasestorage.app",
  messagingSenderId: "825425134452",
  appId: "1:825425134452:web:106bb81d9dcf1151386221"
};

// Initialize Firebase (Only once!)
const app = initializeApp(firebaseConfig);

// Export the tools
export const auth = getAuth(app);
export const db = getFirestore(app);