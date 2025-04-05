// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBREckcOBH8N80p3-RcvjOddUzSxmaHTFA",
    authDomain: "jobmatchai-ad908.firebaseapp.com",
    databaseURL: "https://jobmatchai-ad908-default-rtdb.firebaseio.com",
    projectId: "jobmatchai-ad908",
    storageBucket: "jobmatchai-ad908.firebasestorage.app",
    messagingSenderId: "220277132185",
    appId: "1:220277132185:web:1721dc9b8e17f897062108",
    measurementId: "G-90XJ39XJEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(app);
const auth = getAuth(app);

// Export the services
export { app, database, auth };
