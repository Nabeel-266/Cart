import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6uJkaQiobo8cwAt783FU4Vq8AL9tHq2I",
    authDomain: "shoestore-d2178.firebaseapp.com",
    projectId: "shoestore-d2178",
    storageBucket: "shoestore-d2178.appspot.com",
    messagingSenderId: "132582425016",
    appId: "1:132582425016:web:eb8a665a1d0a0f4b664f4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// Initialize Firebase Firestore Database and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);


export {
    app,
    db,
    storage,
    collection,
    addDoc,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getDocs
}