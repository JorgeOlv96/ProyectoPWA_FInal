importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js");

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
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log('Recibiendo mensajes en segundo plano');
    const tituloNotificacion = payload.notification.title;
    const options = {
        body: payload.notification.body,
        // icon: '../img/40.png',
    };
    self.registration.showNotification(tituloNotificacion, options);
})