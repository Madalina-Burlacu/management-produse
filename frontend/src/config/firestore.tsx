// src/firebaseConfig.tsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Replace these values with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyDRhWCOPiwG9qTX10w5swX4HcYYyhMlFG0",
    authDomain: "management-produse-app.firebaseapp.com",
    projectId: "management-produse-app",
    storageBucket: "management-produse-app.firebasestorage.app",
    messagingSenderId: "434668097770",
    appId: "1:434668097770:web:03c2b74dfbadf5666e0793",
};
// 🔹 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Firebase Services
const db = getFirestore(app); // Firestore (Database)

// For auth integration
const auth = getAuth(app); // Authentication

// 🔹 Export Firebase Services
export { db, auth };
