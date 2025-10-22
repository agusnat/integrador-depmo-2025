// Pantallas/PantallaPerfil.js
import { View, Text, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState, useEffect, useRef } from 'react';
import Styles from '../assets/Styles';
import * as SecureStore from 'expo-secure-store';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { File, Directory, Paths } from 'expo-file-system';

export default function PantallaPerfil({ navigation}) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);


    useEffect(() => { 
        async function cargarDatos() {
            const uid = await SecureStore.getItemAsync('userToken');
            cargar(uid);
        }
        cargarDatos();
    }, []);

    const cargar = async(uid)=> {
        const docSnap = await getDoc(doc(db, "usuarios", uid));

        if (docSnap.exists()) {
            const datos = docSnap.data();
            setNombre(datos.nombre);
            setApellido(datos.apellido);
        } else {
            console.log('No se encontró el documento');
        }
    };

    const guardar = async()=>{
        const uid = await SecureStore.getItemAsync('userToken');

        try {
            await setDoc(doc(db, "usuarios", uid), {
                    nombre,
                    apellido
            });

            Alert.alert("Mis datos", "Datos guardados");
        } catch (error) {
            console.log(error);
            Alert.alert("Mis datos", 'Error al guardar los datos');
        }
    };

    const tomarYGuardarFoto = async () => {
        if (cameraRef.current) {
            try {
                // 1. Tomar la foto
                const foto = await cameraRef.current.takePictureAsync();
                console.log('Foto tomada:', foto.uri);


                // 2. Crear directorio para guardar fotos
                const directorioFotos = new Directory(Paths.document, 'mis_fotos');
                directorioFotos.create({ idempotent: true });


                // 3. Crear nombre único para la foto
                const nombreArchivo = `foto_${Date.now()}.jpg`;


                // 4. Crear archivo de destino
                const archivoDestino = new File(directorioFotos, nombreArchivo);


                // 5. Copiar foto temporal al archivo permanente
                const fotoTemporal = new File(foto.uri);
                fotoTemporal.copy(archivoDestino);


                // 6. Confirmar éxito
                Alert.alert('¡Éxito!', `Foto guardada como: ${nombreArchivo}`);
                setShowCamera(false);


            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'No se pudo guardar la foto');
            }
        }
    };


    if (!permission?.granted) {
        return (
            <View style={Styles.container}>
                <Text style={Styles.text}>Necesitamos permisos de cámara</Text>
                <TouchableOpacity style={Styles.button} onPress={requestPermission}>
                    <Text style={Styles.buttonText}>Solicitar Permisos</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    if (showCamera) {
        return (
            <View style={Styles.contenedorCamara}>
                <CameraView style={Styles.camara} ref={cameraRef} />
                <View style={Styles.controles}>
                    <TouchableOpacity
                        style={Styles.botonCerrar}
                        onPress={() => setShowCamera(false)}
                    >
                    <Text style={Styles.textoBoton}>✕</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Styles.botonCaptura}
                        onPress={tomarYGuardarFoto}
                    >
                    <View style={Styles.circuloCaptura} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Mis datos</Text>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => setShowCamera(true)}
            >
            <Text style={Styles.buttonText}>📷 Tomar Foto</Text>
            </TouchableOpacity>
            <TextInput styles={Styles.input} placeholder={nombre} onChangeText={setNombre}/>
            <TextInput styles={Styles.input} placeholder={apellido} onChangeText={setApellido} />
            <Pressable style={Styles.button} onPress={guardar}>
                <Text style={Styles.buttonText}>Guardar</Text>
            </Pressable>
            <Pressable>
                <Text style={Styles.tinyText} onPress={()=> navigation.goBack()}>Volver hacia atras</Text>
            </Pressable>
        </View>
    );
}
