// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import PantallaInicio from '../Pantallas/PantallaInicio';
import PantallaPerfil from '../Pantallas/PantallaPerfil';
import PantallaAcceso from '../Pantallas/PantallaAcceso';
import PantallaRegistro from '../Pantallas/PantallaRegistro';
import { useAuth } from "../auth/useAuth";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Inicio" component={PantallaInicio} />
      <Stack.Screen name="Perfil" component={PantallaPerfil} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Acceso" component={PantallaAcceso} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={PantallaRegistro} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const [checking, setChecking] = useState(true); 

  useEffect(() => {
    // Chequea sesión persistente 
    const verificarSesion = async () => {
      try {
        const uid = await SecureStore.getItemAsync('userToken');
        setIsAuthenticated(!!uid);
      } finally {
        setChecking(false); 
      }
    };
    verificarSesion();
  }, [setIsAuthenticated]);

  if (checking) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
