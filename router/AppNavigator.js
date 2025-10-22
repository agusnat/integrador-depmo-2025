// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaInicio from '../Pantallas/PantallaInicio';
import PantallaPerfil from '../Pantallas/PantallaPerfil';
import PantallaLogin from '../Pantallas/PantallaLogin';
import { useAuth } from "../auth/useAuth";
import { useEffect, useState, createContext } from 'react';
import { storage } from '../utils/Storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Stack = createNativeStackNavigator();
export const PerfilContext = createContext();

export function AppNavigator() {
    const { setIsAuthenticated, isAuthenticated } = useAuth();
    const [ guardado, setGuardado ] = useState(null);

    useEffect(() => {
        const verificarSesion = async () => {
            const uid = await storage.getItem('uid');

            if (uid) {
                setIsAuthenticated(!!uid);
                cargar(uid);
            }
        };
        verificarSesion();
    }, []);

    const cargar = async(uid)=>{
        const docSnap = await getDoc(doc(db, "usuarios", uid));

        if (docSnap.exists()) {
            const datos = docSnap.data();
            setGuardado(datos);
        } else {
            console.log('No se encontró el documento');
        }
    };

    return (
        <PerfilContext.Provider value={{guardado, setGuardado}}>
            <NavigationContainer>
            <Stack.Navigator >
                { isAuthenticated ? (<>
                    <Stack.Screen name="Inicio" component={PantallaInicio} />
                    <Stack.Screen name="Perfil" component={PantallaPerfil} guardado={guardado}/>
                </>
                ) : (
                    <Stack.Screen name="Login" component={PantallaLogin} />
                )}
            </Stack.Navigator>
            </NavigationContainer>
        </PerfilContext.Provider>
    );
}
