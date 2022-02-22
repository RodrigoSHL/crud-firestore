import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCWUmLo06wVertHZJhxp9E01APwvv_M76k",
    authDomain: "crud-task-1c361.firebaseapp.com",
    projectId: "crud-task-1c361",
    storageBucket: "crud-task-1c361.appspot.com",
    messagingSenderId: "846719345899",
    appId: "1:846719345899:web:75abcbdbeb659e9c61caae",
    measurementId: "G-P7CK993P2E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {
    firebase
}