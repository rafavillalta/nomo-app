import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAALiKvBS9Q8zft4H4P0OR2CzgnekuFmc8",
  authDomain: "nomo-1323.firebaseapp.com",
  projectId: "nomo-1323",
  storageBucket: "nomo-1323.firebasestorage.app",
  messagingSenderId: "429399084890",
  appId: "1:429399084890:web:04296e926e2d6b88daad63",
  measurementId: "G-V3LLJBD628"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
