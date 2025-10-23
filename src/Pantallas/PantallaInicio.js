// Pantallas/PantallaInicio.js
import { View, Text, Pressable, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import Styles from '../styles/Styles';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function PantallaInicio({ navigation }) {
    const { setIsAuthenticated } = useAuth();
    const [region, setRegion] = useState(null); // región del mapa
    const [obteniendo, setObteniendo] = useState(false);

    // Pide permiso de ubicación (foreground)
    const solicitarPermiso = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación');
            return false;
        }
        return true;
    };

    // Cierra sesión y limpia token
    const cerrarSesion = async()=>{
        try {
            await SecureStore.deleteItemAsync('userToken');
            await setIsAuthenticated(false);
        } catch (e) {
            Alert.alert('Sesión', 'No se pudo cerrar sesión');
        }
    }

    // Obtiene ubicación actual y actualiza el mapa
    const obtenerUbicacion = async () => {
        const permiso = await solicitarPermiso();

        if (!permiso) 
            return;

        setObteniendo(true);

        try {
            const ubicacion = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High, // alta precisión
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
             {/* Navegación a Perfil */}
            <Pressable style={Styles.button} onPress={() => navigation.navigate('Perfil')}>
                <Text style={Styles.buttonText}>Mis datos</Text>
            </Pressable>
            {/* Cerrar sesión */}
            <Pressable style={Styles.button} onPress={() => cerrarSesion()}>
                <Text style={Styles.buttonText}>Cerrar sesión</Text>
            </Pressable>
            <Text style={Styles.title}>Mi ubicacion:</Text>
            {/* Botón para solicitar ubicación */}
            <TouchableOpacity
                style={Styles.button}
                onPress={obtenerUbicacion}
                disabled={obteniendo}
            >
                <Text style={Styles.buttonText}>
                    {obteniendo ? 'Obteniendo...' : 'Obtener Ubicación'}
                </Text>
            </TouchableOpacity>
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
