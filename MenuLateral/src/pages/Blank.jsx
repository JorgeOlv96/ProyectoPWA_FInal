import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase'; 
import { useEffect, useState } from 'react';
import Bienvenido from '../assets/Bienvenido.png'; // Importa la imagen desde la carpeta assets

const Blank = () => {
    const getTokenNotification = async () => {
        const token = await getToken(messaging, {
            vapidKey: 'BBkqwhkByDNpsDvUe8PBVtTN0osy9M4DLPWKU0ZKa8uthZ84DUR0dwD2wpNN_ddB3YfUzeIXZ61oT_1kxT0O4Cw'
        }).catch((err) => console.log('No se pudo obtener el token: ', err));

        if (token) {
            console.log('Token: ', token);
        } if (!token) {
            console.log('No hay token disponible');
        }
    }

    const notificarme = () => {
        if (!window.Notification) {
            console.log('Este navegador no soporta notificaciones');
            return;
        }
        if (Notification.permission === 'granted') {
            getTokenNotification();
        } else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
            Notification.requestPermission((permission) => {
                console.log(permission);
                if (permission === 'granted') {
                    getTokenNotification();
                }
            })
        }
    }

    notificarme();


    const [perfil, setPerfil] = useState(null);
    const database = getDatabase();
    useEffect(() => {
        getTokenNotification();
        onMessage(messaging, message => {
            console.log('onMessage: ', message);
            alert(message.notification.title);
        })

        const auth = getAuth();
        const database = getDatabase();

        // Observador de cambios de autenticación
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = ref(database, `usuarios/${user.uid}`);

                // Observador de cambios en los datos del usuario
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();
                    setPerfil(userData);
                });
            } else {
                // Manejar caso de usuario no autenticado
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1 style={{ color: "#FF7008", fontSize: 50 }}>Bienvenido</h1>
            {perfil && (
                <div>
                    <img src={Bienvenido} alt="Imagen de perfil" />
                </div>
            )}
        </div>
    );
};

export default Blank;
