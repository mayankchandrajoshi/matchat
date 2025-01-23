import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCkR2O4jCOsME_dCG33sS1MCO-HrrSq7_E",
    authDomain: "matchatotp.firebaseapp.com",
    projectId: "matchatotp",
    storageBucket: "matchatotp.firebasestorage.app",
    messagingSenderId: "693304243867",
    appId: "1:693304243867:web:762940b323a0591719383e",
    measurementId: "G-45X78587WD"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app)

auth.useDeviceLanguage();

export { auth };