
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('ServiceWorker registrado exitosamente ', registration.scope);
    }, function (err) {
      console.log('ServiceWorker fallo el registro de sw ', err);
    });
  });
}

const notifyInternetOnline = () => {
  const notificationTitle = 'Conexión a Internet restaurada';
  const notificationOptions = {
    body: '¡Ya estás conectado de nuevo!',
  };
  new Notification(notificationTitle, notificationOptions);
};

const notifyInternetOffline = () => {
  const notificationTitle = 'Conexión a Internet perdida';
  const notificationOptions = {
    body: '¡Estás sin conexión!',
  };
  new Notification(notificationTitle, notificationOptions);
};

const isOnline = () => {
  if (navigator.onLine) {
    // alert('¡Estás con conexion!');
    notifyInternetOnline();
  } else {
    // alert('¡Estás sin conexion!');
    // notifyInternetOffline();
  }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline(); 