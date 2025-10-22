// Pantallas/PantallaInicio.js
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../auth/useAuth';


export default function PantallaInicio({ navigation }) {
    const { setIsAuthenticated } = useAuth();

    const cerrarSesion = async()=>{
        await AsyncStorage.removeItem("uid");
        await setIsAuthenticated(false);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bienvenido a la pantalla de inicio</Text>
            <Button title="Ir a Perfil" onPress={() => navigation.navigate('Perfil')} />
            <Button title="Cerrar sesion" onPress={() => cerrarSesion()} />
        </View>
    );
}
