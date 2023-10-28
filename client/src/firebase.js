// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-app.firebaseapp.com",
  projectId: "mern-estate-app",
  storageBucket: "mern-estate-app.appspot.com",
  messagingSenderId: "712789420941",
  appId: "1:712789420941:web:c784e408fa0314ec18abc4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);