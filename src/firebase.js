//import firebase from "./firebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXmPCErem1soUtnwPmBZaz3X0KIB5P_JA",
  authDomain: "hotelsbooking-8ef31.firebaseapp.com",
  projectId: "hotelsbooking-8ef31",
  storageBucket: "hotelsbooking-8ef31.firebasestorage.app",
  messagingSenderId: "801013818355",
  appId: "1:801013818355:web:a7c36edecb3a34358ee886",
  measurementId: "G-XQECR7M4GG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
