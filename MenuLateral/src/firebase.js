import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB7TCK4XB22qI2HPLCQi4PMA5h3oNS4WAA",
  authDomain: "pwa-service-998cd.firebaseapp.com",
  projectId: "pwa-service-998cd",
  storageBucket: "pwa-service-998cd.appspot.com",
  messagingSenderId: "128611623155",
  appId: "1:128611623155:web:27cf1a8e901389a769d786",
  measurementId: "G-TXZWJZ0LYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);