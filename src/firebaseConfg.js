// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import {getAuth} from '@firebase/auth';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAEA8_RFgzRWKlisI8CFsgrvDP-VOkvkc",
  authDomain: "linkedin-clone-2af80.firebaseapp.com",
  projectId: "linkedin-clone-2af80",
  storageBucket: "linkedin-clone-2af80.appspot.com",
  messagingSenderId: "800053927112",
  appId: "1:800053927112:web:783be8b0998b876be6d9fd",
  measurementId: "G-9RQGVYZQ15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage =  getStorage(app);
