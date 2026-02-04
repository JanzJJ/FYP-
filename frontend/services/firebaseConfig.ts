// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// TODO: Replace with your actual config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBpG_eZ0VA-iuiCeI07XvoCH5r0M3vfzck",
    authDomain: "staycare-app.firebaseapp.com",
    projectId: "staycare-app",
    storageBucket: "staycare-app.firebasestorage.app",
    messagingSenderId: "111885148",
    appId: "1:111885148:web:dd1f8ed329cff913fb9f99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
