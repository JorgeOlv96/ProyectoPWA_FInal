import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevaCarrera, setNuevaCarrera] = useState('');
  const [nuevoTelefono, setNuevoTelefono] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const database = getDatabase(); // Obtiene la instancia de la base de datos

  useEffect(() => {
    const auth = getAuth();
    const database = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, `usuarios/${user.uid}`);

        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setPerfil(userData);
        });
      } else {
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para actualizar el perfil
  const actualizarPerfil = () => {
    if (perfil) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userRef = ref(database, `usuarios/${user.uid}`);
      const nuevosDatos = {
        nombre: nuevoNombre || perfil.nombre,
        apellido: nuevoApellido || perfil.apellido,
        carreraOcupacion: nuevaCarrera || perfil.carreraOcupacion,
        telefono: nuevoTelefono || perfil.telefono,
        correo: nuevoCorreo || perfil.correo
      };
      update(userRef, nuevosDatos)
        .then(() => {
          console.log('Perfil actualizado en la base de datos');
          handleCloseModal(); // Cierra el modal después de guardar los cambios
        })
        .catch((error) => {
          console.error('Error al actualizar el perfil en la base de datos:', error);
          // Puedes manejar el error aquí (mostrar un mensaje de error, etc.)
        });
    }
  };

  return (
    <div>

      <div style={styles.container}>
        {perfil ? (
          <>
            <img src="https://expreso.blob.core.windows.net.optimalcdn.com/images/2023/03/27/natanaelcano-89d35fda-focus-0-0-1300-865.jpg" style={styles.image} alt="Foto de perfil" />
            <div style={styles.info}>
              <div style={styles.label}>Nombre:</div>
              <div style={styles.span}>{perfil.nombre} {perfil.apellido}</div>
              <div style={styles.label}>Carrera:</div>
              <div style={styles.span}>{perfil.carreraOcupacion}</div>
              <div style={styles.label}>Teléfono:</div>
              <div style={styles.span}>{perfil.telefono}</div>
              <div style={styles.label}>Correo:</div>
              <div style={styles.span}>{perfil.correo}</div>
            </div>

            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{ borderRadius: 15 }}
            >
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 3 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                  Editar Perfil
                </Typography>
                <Box sx={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
                  <TextField
                    margin="normal"
                    required
                    id="nombre"
                    label="Nuevo nombre"
                    name="nombre"
                    autoComplete="off"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="apellido"
                    label="Nuevo apellido"
                    name="apellido"
                    autoComplete="off"
                    value={nuevoApellido}
                    onChange={(e) => setNuevoApellido(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '2fr' }}>
                  <TextField
                    margin="normal"
                    required
                    id="carrera"
                    label="Nueva carrera"
                    name="carrera"
                    autoComplete="off"
                    value={nuevaCarrera}
                    onChange={(e) => setNuevaCarrera(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="telefono"
                    label="Nuevo teléfono"
                    name="telefono"
                    autoComplete="off"
                    value={nuevoTelefono}
                    onChange={(e) => setNuevoTelefono(e.target.value)}
                  />
                  {/* <TextField
                    margin="normal"
                    required
                    id="correo"
                    label="Nuevo correo"
                    name="correo"
                    autoComplete="off"
                    value={nuevoCorreo}
                    onChange={(e) => setNuevoCorreo(e.target.value)}
                  /> */}
                </Box>
                <Box sx={{ display: 'flex', marginTop: '10px' ,gap: '16px'}}>
                  <Button onClick={handleCloseModal} variant="contained" style={{ border: '2px solid #FF775A', backgroundColor:"#ffffff", color:"#FF775A" }}>
                    Cancelar
                  </Button>
                  <Button onClick={actualizarPerfil} variant="contained" color="primary" style={{ backgroundColor: "#FF775A" }}>
                    Guardar
                  </Button>
                </Box>
              </Box>
            </Modal>



          </>
        ) : (
          <div>Cargando datos...</div>
        )}

      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10, }}>
        <Button onClick={handleOpenModal} variant="contained" color="primary" style={{ backgroundColor: '#FF775A', width:"35%"}}>Editar perfil</Button>
      </div>
    </div>

  );
};




const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '15px',
    maxWidth: '300px',
    margin: 'auto',
    marginTop: '50px',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    backgroundColor: 'red',
  },
  info: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '5px',
  },
  span: {
    marginBottom: '10px',
  }
};
