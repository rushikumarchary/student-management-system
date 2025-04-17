// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPWMxPXFMfG4EWfYMdGgccI4DOGfL2nwM",
  authDomain: "education-management-sys-28b1f.firebaseapp.com",
  projectId: "education-management-sys-28b1f",
  storageBucket: "education-management-sys-28b1f.firebasestorage.app",
  messagingSenderId: "67861352351",
  appId: "1:67861352351:web:0f330941655dc5a577b7aa",
  measurementId: "G-6G2Z0R9GF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }; 