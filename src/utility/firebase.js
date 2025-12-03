
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMNj5UDBLNq2mNvTV209-LDIFgfsk1j-4",
  authDomain: "real-estate-backend-99b26.firebaseapp.com",
  projectId: "real-estate-backend-99b26",
  storageBucket: "real-estate-backend-99b26.firebasestorage.app",
  messagingSenderId: "195314172960",
  appId: "1:195314172960:web:3cc7af29e20ecb9da3e845"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);