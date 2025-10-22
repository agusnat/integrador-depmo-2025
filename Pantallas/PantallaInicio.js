// Pantallas/PantallaInicio.js
import { View, Text, Pressable, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import Styles from '../assets/Styles';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function PantallaInicio({ navigation }) {
    const { setIsAuthenticated } = useAuth();
    const [region, setRegion] = useState(null);
    const [obteniendo, setObteniendo] = useState(false);

    const solicitarPermiso = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación');
            return false;
        }
        return true;
    };

    const cerrarSesion = async()=>{
        await SecureStore.deleteItemAsync('userToken');
        await setIsAuthenticated(false);
    }

    const obtenerUbicacion = async () => {
        const permiso = await solicitarPermiso();
        if (!permiso) return;


        setObteniendo(true);
        try {
            const ubicacion = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setRegion({
                latitude: ubicacion.coords.latitude,
                longitude: ubicacion.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            console.log('📍 Ubicación obtenida:', ubicacion.coords.latitude, ubicacion.coords.longitude);
        } catch (error) {
            console.error('Error al obtener ubicación:', error);
            Alert.alert('Error', 'No se pudo obtener la ubicación');
        } finally {
            setObteniendo(false);
        }
    };
    
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Bienvenido</Text>
            <Pressable style={Styles.button} onPress={() => navigation.navigate('Perfil')}>
                <Text style={Styles.buttonText}>Mis datos</Text>
            </Pressable>
            <Pressable style={Styles.button} onPress={() => cerrarSesion()}>
                <Text style={Styles.buttonText}>Cerrar sesión</Text>
            </Pressable>
            <Text style={Styles.title}>Mi ubicacion:</Text>
            <View>
                <TouchableOpacity
                    style={Styles.button}
                    onPress={obtenerUbicacion}
                    disabled={obteniendo}
                >
                    <Text style={Styles.buttonText}>
                        {obteniendo ? 'Obteniendo...' : 'Obtener Ubicación'}
                    </Text>
                </TouchableOpacity>
            </View>
            { obteniendo ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : region ? (
                <MapView style={Styles.map} region={region}>
                    <Marker
                        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                        title="Mi ubicación"
                        description={`Lat: ${region.latitude.toFixed(6)}, Lon: ${region.longitude.toFixed(6)}`}
                    />
                </MapView>
            ) : (
                <Text style={Styles.error}>No se pudo obtener la ubicación</Text>
            )}
        </View>
    );
}
