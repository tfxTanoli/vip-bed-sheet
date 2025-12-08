import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.FIREBASE_APP_ID,
    databaseURL: import.meta.env.FIREBASE_DATABASE_URL
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
export const auth = getAuth(firebaseApp);

export default firebaseApp;