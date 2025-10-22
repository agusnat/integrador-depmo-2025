// Pantallas/PantallaPerfil.js
import { View, Text, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState, useEffect, useRef } from 'react';
import Styles from '../assets/Styles';
import * as SecureStore from 'expo-secure-store';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { File, Directory, Paths } from 'expo-file-system';

export default function PantallaPerfil({ navigation}) {
    const [fotoUri, setFotoUri] = useState(null);
    const [datos, setDatos] = useState(null);
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
            setDatos(datos);
        } else {
            console.log('No se encontró el documento');
        }
    };

    const guardar = async()=>{
        const uid = await SecureStore.getItemAsync('userToken');

        try {
            await setDoc(doc(db, "usuarios", uid), datos);

            Alert.alert("Mis datos", "Datos guardados");
        } catch (error) {
            console.log(error);
            Alert.alert("Mis datos", 'Error al guardar los datos');
        }
    };

    const tomarYGuardarFoto = async () => {
        if (!cameraRef.current) return;

        try {
            const foto = await cameraRef.current.takePictureAsync();
            console.log('Foto tomada:', foto.uri);

            const dir = new Directory(Paths.document, 'mis_fotos');
            await dir.create({ idempotent: true });

            const nombreArchivo = `foto_${Date.now()}.jpg`;

            const archivoDestino = new File(dir, nombreArchivo);

            const archivoOrigen = new File(foto.uri);
            await archivoOrigen.copy(archivoDestino);

            setFotoUri(archivoDestino.uri);
            setShowCamera(false);

            Alert.alert('Éxito', `Foto guardada`);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo guardar la foto');
        }
    };

    if (!datos) return (<>
        <View style={Styles.container}>
            <ActivityIndicator size="large" />
        </View>
    </>);

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
                <CameraView style={Styles.camara} ref={cameraRef} facing='front' />
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
            <Text style={Styles.label}>Foto de perfil:</Text>
            {fotoUri ? (
                <Image
                    source={{ uri: fotoUri }}  
                    style={{ width: 200, height: 200, borderRadius: 12, marginTop: 12 }}
                />
            ) : (
                <Text style={Styles.imagePlaceholder}>Todavía no hay foto</Text>
            )}
            <TouchableOpacity
                style={Styles.button}
                onPress={() => setShowCamera(true)}
            >
            <Text style={Styles.buttonText}>Subir foto</Text>
            </TouchableOpacity>
            <Text style={Styles.label}>Nombre:</Text>
            <TextInput style={Styles.input} placeholder={datos.nombre} onChangeText={(text) => setDatos({ ...datos, nombre: text })}/>
            <Text style={Styles.label}>Apellido:</Text>
            <TextInput style={Styles.input} placeholder={datos.apellido} onChangeText={(text) => setDatos({ ...datos, apellido: text })}/>
            <Pressable style={Styles.button} onPress={guardar}>
                <Text style={Styles.buttonText}>Guardar</Text>
            </Pressable>
            <Pressable>
                <Text style={Styles.tinyText} onPress={()=> navigation.goBack()}>Volver hacia atras</Text>
            </Pressable>
        </View>
    );
}
