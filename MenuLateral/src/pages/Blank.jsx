import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import Bienvenido from '../assets/Bienvenido.png'; // Importa la imagen desde la carpeta assets

const Blank = () => {
    const [perfil, setPerfil] = useState(null);
    const database = getDatabase(); 
    useEffect(() => {
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

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h1 style={{color:"#FF7008", fontSize:50}}>Bienvenido</h1>
        {perfil && (
            <div>
                <img src={Bienvenido} alt="Imagen de perfil" /> 
            </div>
        )}
    </div>
    );
};

export default Blank;
