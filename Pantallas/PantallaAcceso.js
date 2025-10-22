// Pantallas/PantallaAcceso.js
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../auth/useAuth';
import Styles from '../assets/Styles';
import * as SecureStore from 'expo-secure-store';

export default function PantallaAcceso({ navigation }) {
    const { setIsAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const esEmailValido = (email) => /\S+@\S+\.\S+/.test(email);

    const loguear = async()=>{    
            try {
                const auth = getAuth();

                if(email.length < 1)
                    return Alert.alert("Login", 'Ingresa un email!');

                
                if(!esEmailValido(email))
                    return Alert.alert("Registro", 'El email no es valido');

                if(pass.length < 1)
                    return Alert.alert("Login", 'Ingresa una contraseña');

                signInWithEmailAndPassword(auth, email, pass)
                .then(async (userCredential) => {
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
            <TextInput style={Styles.input} placeholder="Correo" onChangeText={setEmail}/>
            <TextInput style={Styles.input} placeholder="Contraseña" onChangeText={setPass} secureTextEntry/>
            <Pressable style={Styles.button} onPress={loguear}>
                <Text style={Styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
            <Pressable onPress={()=> navigation.navigate('Registro')}>
                <Text style={Styles.tinyText}>¿No tenes cuenta? Registrarme</Text>
            </Pressable>
            <Pressable onPress={recuperarPass}>
                <Text style={Styles.tinyText}>Olvide mi contraseña</Text>
            </Pressable>
        </View>
    );
}
