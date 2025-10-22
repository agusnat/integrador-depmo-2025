import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdLJx6BOS3eOkRxU2p89z9YsdlMV5bNeg",
  authDomain: "rhea-f9518.firebaseapp.com",
  projectId: "rhea-f9518",
  storageBucket: "rhea-f9518.firebasestorage.app",
  messagingSenderId: "449240212106",
  appId: "1:449240212106:web:46aa071654ff2e73738373",
  measurementId: "G-4C8ZBHHM42"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


