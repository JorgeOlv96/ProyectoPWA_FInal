// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7TCK4XB22qI2HPLCQi4PMA5h3oNS4WAA",
  authDomain: "pwa-service-998cd.firebaseapp.com",
  projectId: "pwa-service-998cd",
  storageBucket: "pwa-service-998cd.appspot.com",
  messagingSenderId: "128611623155",
  appId: "1:128611623155:web:27cf1a8e901389a769d786"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;