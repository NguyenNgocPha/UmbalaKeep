// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from "firebase";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6wTEyBWqMmOdyt351gWX0KWJ_JwJJgac",
  authDomain: "doctor-home-1c0a5.firebaseapp.com",
  projectId: "doctor-home-1c0a5",
  storageBucket: "doctor-home-1c0a5.appspot.com",
  messagingSenderId: "299186204859",
  appId: "1:299186204859:web:d00d112bcca871f417799e",
  measurementId: "G-X968HG6CWH",
};

// Initialize Firebase
let app;
let db;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth, db };
