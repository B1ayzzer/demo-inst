import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD80mGJhHUdRvzzlgO17eT_EX2b-6Lx3GM",
  authDomain: "bakai-blog.firebaseapp.com",
  projectId: "bakai-blog",
  storageBucket: "bakai-blog.appspot.com",
  messagingSenderId: "149627858081",
  appId: "1:149627858081:web:ebf031c53dfc69d44654e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
