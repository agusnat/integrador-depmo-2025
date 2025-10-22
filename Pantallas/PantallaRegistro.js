// Pantallas/PantallaRegistro.js
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import Styles from '../assets/Styles';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';
import * as SecureStore from 'expo-secure-store';

export default function PantallaRegistro({ navigation }) {
    const { setIsAuthenticated } = useAuth();

    const [ form, setForm ] = useState({
        email: '',
        pass: '',
        repeatPass: '',
        nombre: '',
        apellido: ''
    });

    const esEmailValido = (email) => /\S+@\S+\.\S+/.test(email);

    const registrar = async() => {    
        try {
            if(form.email.length < 1)
                return Alert.alert("Registro", 'Ingresa un correo electronico');
            
            if(!esEmailValido(form.email))
                return Alert.alert("Registro", 'El email no es valido');

            if(form.pass.length < 1)
                return Alert.alert("Registro", 'Ingresa una contraseña');

            if(form.pass.length <= 5)
                return Alert.alert("Registro", 'La contraseña debe tener al menos 6 caracteres');

            if(form.pass !== form.repeatPass)
                return Alert.alert("Registro", 'Las contraseñas no coinciden');

            if(form.nombre.length < 1 || form.apellido.length < 1)
                return Alert.alert("Registro", 'Ingresa tu nombre y apellido');

            try {
                const auth = getAuth();
                
                const res = await createUserWithEmailAndPassword(auth, form.email, form.pass);
                const userId = res.user.uid;

                if(userId) {
                    Alert.alert("Registro", 'Registro exitoso!');

                    await SecureStore.setItemAsync('userToken', userId);
                    
                    await setDoc(doc(db, "usuarios", userId), {
                            nombre: form.nombre,
                            apellido: form.apellido
                    });

                    setIsAuthenticated(!!userId);
                }  
            } catch(e) {
                if(e.code === 'auth/email-already-in-use')
                        Alert.alert("Registro", 'El correo electronico ya esta en uso!');

                console.log(e);
            }
            
        } catch (error) {

            console.log(error);
        }
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Registro</Text>
            <Text style={Styles.label}>Datos de ingreso:</Text>
            <TextInput style={Styles.input} placeholder="Correo electronico" onChangeText={(text) => setForm({ ...form, email: text })}/>
            <TextInput style={Styles.input} placeholder="Contraseña" onChangeText={(text) => setForm({ ...form, pass: text })} secureTextEntry/>
            <TextInput style={Styles.input} placeholder="Repetir contraseña"  onChangeText={(text) => setForm({ ...form, repeatPass: text })} secureTextEntry/>
            <Text style={Styles.label}>Informacion personal:</Text>
            <TextInput style={Styles.input} placeholder="Nombre" onChangeText={(text) => setForm({ ...form, nombre: text })}/>
            <TextInput style={Styles.input} placeholder="Apellido" onChangeText={(text) => setForm({ ...form, apellido: text })}/>
            <Pressable style={Styles.button} onPress={registrar}>
                <Text style={Styles.buttonText}>Registrarme</Text>
            </Pressable>
            <Pressable>
                <Text style={Styles.tinyText} onPress={()=> navigation.goBack()}>Volver hacia atras</Text>
            </Pressable>
        </View>
    );
}
