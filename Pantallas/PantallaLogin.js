// Pantallas/PantallaLogin.js
import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { storage } from '../utils/Storage';
import { useAuth } from '../auth/useAuth';

export default function PantallaLogin() {
    const { setIsAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const loguear = async()=>{    
            try {
                const auth = getAuth();

                signInWithEmailAndPassword(auth, email, pass)
                .then(async (userCredential) => {
                    const user = userCredential.user;

                    await storage.setItem("uid", user.uid);
                    
                    setIsAuthenticated(!!user.uid);
                    alert("Iniciaste sesion correctamente");
                })
                .catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Acceso de usuario</Text>
            <TextInput placeholder="Correo" onChangeText={setEmail}/>
            <TextInput placeholder="Contraseña" onChangeText={setPass} secureTextEntry/>
            <Button title="Loguear" onPress={loguear} />
        </View>
    );
}
