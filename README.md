# 📱 App Expo + Firebase Auth — README

Una app móvil hecha en Expo (React Native) con Firebase que permite:

Registro con email + contraseña (campos: nombre y apellido).

Inicio de sesión y cerrar sesión.

Recuperar contraseña por email.

Pantalla de inicio para usuarios autenticados.

Ajustes de perfil: modificar nombre y apellido y subir foto de perfil desde el celular (galería/cámara).

Persistencia de datos de perfil en Firestore y foto en Firebase Storage.

## ✨ Características

### 🔒 Autenticación segura con firebase/auth (Email/Password).

### 👤 Perfiles de usuario: users/{uid} en Firestore.

### 🖼️ Subida de imagen de perfil con expo-camera → Storage.

### 🧰 Tecnologías:

Expo
 (React Native)

Firebase Auth

Cloud Firestore

Firebase Storage

expo-camera para imágenes 

### Plantilla .env:

```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```