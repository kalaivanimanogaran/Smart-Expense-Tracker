// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider}from "firebase/auth";
import { getFirestore, doc,setDoc}from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGpriI0E1gr6oLHxQ9IP3p8F68lKyJ8AA",
  authDomain: "expense-tracker-b086d.firebaseapp.com",
  projectId: "expense-tracker-b086d",
  storageBucket: "expense-tracker-b086d.firebasestorage.app",
  messagingSenderId: "727819668829",
  appId: "1:727819668829:web:0e078f0d13eaedbcb6acb4",
  measurementId: "G-S1BBGNSRM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db,auth,provider,doc,setDoc };


