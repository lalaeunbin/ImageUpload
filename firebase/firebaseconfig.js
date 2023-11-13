import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDFLLn7rEsNwN1RX7HWipX5c2gphWXTb_0",
    authDomain: "clip-a301d.firebaseapp.com",
    projectId: "clip-a301d",
    storageBucket: "clip-a301d.appspot.com",
    messagingSenderId: "163550400412",
    appId: "1:163550400412:web:651af6e7d1ec0589b2c259"
};


//initalize firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);
