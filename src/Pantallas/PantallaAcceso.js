// Pantallas/PantallaAcceso.js
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../auth/useAuth';
import Styles from '../styles/Styles';
import * as SecureStore from 'expo-secure-store';

export default function PantallaAcceso({ navigation }) {
    const { setIsAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Validación básica de formato de email
    const esEmailValido = (email) => /\S+@\S+\.\S+/.test(email);

    // --- Función principal de login ---
    const loguear = async()=>{    
            try {
                const auth = getAuth(); // Inicializa autenticador Firebase

                // Validaciones previas
                if(email.length < 1)
                    return Alert.alert("Login", 'Ingresa un email!');

                
                if(!esEmailValido(email))
                    return Alert.alert("Login", 'El email no es valido');

                if(pass.length < 1)
                    return Alert.alert("Login", 'Ingresa una contraseña');

                // Autenticación con Firebase
                signInWithEmailAndPassword(auth, email, pass)
                .then(async (userCredential) => {
                    // Guarda token localmente
                    const user = userCredential.user;
                    await SecureStore.setItemAsync('userToken', user.uid);
                    
                    setIsAuthenticated(!!user.uid);
                    Alert.alert("Login", "Iniciaste sesion correctamente");
                })
                .catch((error) => {
                    if(error.code === 'auth/invalid-credential')
                        Alert.alert("Login", 'Usuario o contraseña invalidos!')

                    console.log(error);
                });
            } catch (error) {

                console.log(error);
            }
        };
    
        // --- Recuperar contraseña por correo ---
        const recuperarPass = async()=> {
            try {

                if(email.length < 1)
                    return Alert.alert("Recuperar contraseña", 'Ingresa un email!');

                const auth = getAuth();

                await sendPasswordResetEmail(auth, email);

                Alert.alert("Recuperar contraseña", "Recuperacion de contraseña enviado, revisa tu casilla de correo");
            } catch (error) {
                console.log(error);
            }   
        };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Acceso</Text>
            {/* Campos de entrada */}
            <TextInput style={Styles.input} placeholder="Correo" onChangeText={setEmail}/>
            <TextInput style={Styles.input} placeholder="Contraseña" onChangeText={setPass} secureTextEntry/>
            {/* Botón de login */}
            <Pressable style={Styles.button} onPress={loguear}>
                <Text style={Styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
            {/* Navegación a registro */}
            <Pressable onPress={()=> navigation.navigate('Registro')}>
                <Text style={Styles.tinyText}>¿No tenes cuenta? Registrarme</Text>
            </Pressable>
            {/* Recuperar contraseña */}
            <Pressable onPress={recuperarPass}>
                <Text style={Styles.tinyText}>Olvide mi contraseña</Text>
            </Pressable>
        </View>
    );
}
