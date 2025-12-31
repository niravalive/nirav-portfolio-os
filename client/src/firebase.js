// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTHkCsaSp7-kBwHMzQFT7vEJE85hZ8kKk",
  authDomain: "nirav-portfolio-os.firebaseapp.com",
  projectId: "nirav-portfolio-os",
  storageBucket: "nirav-portfolio-os.firebasestorage.app",
  messagingSenderId: "743650129080",
  appId: "1:743650129080:web:9f810a296888eaaaf3b04d",
  measurementId: "G-M3EX7GEJFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);