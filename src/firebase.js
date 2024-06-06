import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDItgBwSpPeXNYXAVO3tZKESMUDss4bhyw",
    authDomain: "final-app-bbc96.firebaseapp.com",
    projectId: "final-app-bbc96",
    storageBucket: "final-app-bbc96.appspot.com",
    messagingSenderId: "258915394954",
    appId: "1:258915394954:web:c8c8d34fc65a6f0f181473"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firebase Functions (if needed)
const functions = firebase.functions();

export { db, auth, functions };