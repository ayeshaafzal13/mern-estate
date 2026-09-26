// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ab482.firebaseapp.com",
  projectId: "mern-estate-ab482",
  storageBucket: "mern-estate-ab482.firebasestorage.app",
  messagingSenderId: "130993564654",
  appId: "1:130993564654:web:2b9f9fd561d93439993cff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);