import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
        apiKey: "AIzaSyB3st83h4b6OyeZgjRin9kLXFqH823MZRM",
        authDomain: "projectnoname-galileo.firebaseapp.com",
        databaseURL: "https://projectnoname-galileo.firebaseio.com",
        projectId: "projectnoname-galileo",
        storageBucket: "projectnoname-galileo.appspot.com",
        messagingSenderId: "247552782614",
        appId: "1:247552782614:web:cd92f1810f8dfcef0c6037",
        measurementId: "G-Q787J00RSS"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();
const fb = firebase;
const auth = firebase.default.auth();

export { fb, db, auth };