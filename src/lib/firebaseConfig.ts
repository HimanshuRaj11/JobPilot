

// ------------   This is only for development --------
// -----------    Set these data on env on Production ------

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAeOWLvH7N5t5W3Ju_fKtJC5sCFHqzhLFU",
    authDomain: "jobpilot-de59a.firebaseapp.com",
    projectId: "jobpilot-de59a",
    storageBucket: "jobpilot-de59a.firebasestorage.app",
    messagingSenderId: "1012838762687",
    appId: "1:1012838762687:web:8226f00cce4cbbaaa3de0a",
    measurementId: "G-183FY32GGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };