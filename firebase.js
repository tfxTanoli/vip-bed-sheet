import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpENQyItrNMdw4xwoOWSYY2Z0E3N6kV4g",
    authDomain: "vip-bedsheet.firebaseapp.com",
    projectId: "vip-bedsheet",
    storageBucket: "vip-bedsheet.firebasestorage.app",
    messagingSenderId: "261885371706",
    databaseURL: "https://vip-bedsheet-default-rtdb.firebaseio.com/",
    appId: "1:261885371706:web:635207fb2509ea438c9c03"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
export const auth = getAuth(firebaseApp);

export default firebaseApp;