// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaInicio from '../Pantallas/PantallaInicio';
import PantallaPerfil from '../Pantallas/PantallaPerfil';
import { useAuth } from "../auth/useAuth";
import { useEffect } from 'react';
import PantallaAcceso from '../Pantallas/PantallaAcceso';
import PantallaRegistro from '../Pantallas/PantallaRegistro';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    const { setIsAuthenticated, isAuthenticated } = useAuth();

    useEffect(() => {
        const verificarSesion = async () => {
            const uid = await SecureStore.getItemAsync('userToken');

            if (uid) 
                setIsAuthenticated(!!uid);
        };
        verificarSesion();
    }, []);

    return (
        <NavigationContainer>
        <Stack.Navigator>
            { isAuthenticated ? (<>
                <Stack.Screen name="Inicio" component={PantallaInicio} />
                <Stack.Screen name="Perfil" component={PantallaPerfil} />
            </>
            ) : (<>
                <Stack.Screen name="Acceso" component={PantallaAcceso} />
                <Stack.Screen name="Registro" component={PantallaRegistro} />
            </>)}
        </Stack.Navigator>
        </NavigationContainer>
    );
}
