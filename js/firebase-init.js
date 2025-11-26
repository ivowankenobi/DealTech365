// Firebase v9+ modular SDK initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB8i8SgsSzDlvc5xIOiyOco3JGUKLD6L6E",
  authDomain: "dealtech365.firebaseapp.com",
  projectId: "dealtech365",
  storageBucket: "dealtech365.firebasestorage.app",
  messagingSenderId: "222253855838",
  appId: "1:222253855838:web:e6ecf1a41577605adbb0cf",
  measurementId: "G-HEZ2Z57ZZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
