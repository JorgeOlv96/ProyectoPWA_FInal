/* 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registrado exitosamente ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker fallo el registro de sw ', err);
      });
    });
  }
   */
/* 
  const isOnline = () => {
    if (navigator.onLine) {
        alert('¡Estás con conexion!');
    } else {
        alert('¡Estás sin conexion!');
    }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline(); */