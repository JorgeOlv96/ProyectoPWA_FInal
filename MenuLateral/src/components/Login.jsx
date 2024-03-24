import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';  
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database'; // Importar set de Firebase Realtime Database
import appFirebase from '../credenciales';

const auth = getAuth(appFirebase);
const database = getDatabase(appFirebase);

const defaultTheme = createTheme();

export default function Login() {
  const [signin, setSignin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [carreraOcupacion, setCarreraOcupacion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleAuthentication = async (event) => {
    event.preventDefault();
    try {
      if (signin) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        // Escribir datos del usuario en la base de datos
        await set(ref(database, `usuarios/${userCredential.user.uid}`), {
          correo: email,
          nombre: nombre,
          apellido: apellido,
          carreraOcupacion: carreraOcupacion,
          telefono: telefono
        });
        // Manejar registro exitoso aquí
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        // Manejar inicio de sesión exitoso aquí
      }
    } catch (error) {
      console.log(error);
      // Manejar errores de autenticación aquí (mostrar mensaje de error, etc.)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signin ? "Registrarse" : "Iniciar sesión"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleAuthentication} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {signin && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    autoComplete="off"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    name="apellido"
                    autoComplete="off"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="carreraOcupacion"
                    label="Carrera u ocupación"
                    name="carreraOcupacion"
                    autoComplete="off"
                    value={carreraOcupacion}
                    onChange={(e) => setCarreraOcupacion(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="telefono"
                    label="Teléfono"
                    name="telefono"
                    autoComplete="off"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {signin ? "Registrarse" : "Iniciar sesión"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setSignin(!signin)}>
                    {signin ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
