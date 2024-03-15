import { useState } from 'react';
import appFirebase from './credenciales';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './components/Login';
import Home from './components/Home';
import AppLayout from './components/layout/AppLayout';

const auth = getAuth(appFirebase);

function App() {

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
            setUser(userFirebase);
        } else {
            setUser(null);
        }
    });

    return <div>{user ? <AppLayout /> : <Login />}</div>;
}

export default App;
