// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA6jtp1xZuhHZ0cw80Mm1W4L9exa1GS7Hw",
  authDomain: "netlogic-login.firebaseapp.com",
  projectId: "netlogic-login",
  storageBucket: "netlogic-login.appspot.com",
  messagingSenderId: "538866877348",
  appId: "1:538866877348:web:b71ee55be70be1aa9bb731",
  measurementId: "G-F0M6715DGH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, facebookProvider };
