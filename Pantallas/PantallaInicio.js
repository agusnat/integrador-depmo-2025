// Pantallas/PantallaInicio.js
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../auth/useAuth';
import Styles from '../assets/Styles';
import * as SecureStore from 'expo-secure-store';

export default function PantallaInicio({ navigation }) {
    const { setIsAuthenticated } = useAuth();

    const cerrarSesion = async()=>{
        await SecureStore.deleteItemAsync('userToken');
        await setIsAuthenticated(false);
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Bienvenido</Text>
            <Pressable style={Styles.button} onPress={() => navigation.navigate('Perfil')}>
                <Text style={Styles.buttonText}>Mis datos</Text>
            </Pressable>
            <Pressable style={Styles.button} onPress={() => cerrarSesion()}>
                <Text style={Styles.buttonText}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
}
