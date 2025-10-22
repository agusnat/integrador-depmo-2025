// Pantallas/PantallaPerfil.js
import { View, Text, Button, TextInput } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState, useContext } from 'react';
import { storage } from '../utils/Storage';
import { PerfilContext } from '../router/AppNavigator';

export default function PantallaPerfil({ navigation}) {
    const {guardado, setGuardado} = useContext(PerfilContext);

    const guardar = async()=>{
        const uid = await storage.getItem("uid");

        try {
            await setDoc(doc(db, "usuarios", uid), {
                    nombre: guardado.nombre,
                    edad: guardado.edad
            });
            
            setGuardado({nombre, edad});
        } catch (error) {
            console.log(error);
        }
        alert("Datos guardados");
    };
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pantalla de perfil</Text>
            <TextInput placeholder={guardado.nombre} onChangeText={setGuardado(guardado => ({ ... guardado, nombre            
            }))}/>
            <TextInput placeholder={guardado.edad} />
            <Button title="Guardar datos" onPress={guardar}/>
            <Button title="Volver atras" onPress={()=> navigation.goBack()} />
        </View>
    );
}
