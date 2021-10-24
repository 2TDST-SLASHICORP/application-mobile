
import firebase from "firebase";
import 'firebase/database'

const firebaseConfig = {

    apiKey: "AIzaSyDGc7z3CpTB5D3P--TR2XD7_JJtC-R1Cgk",

    authDomain: "slashi-mobile.firebaseapp.com",

    databaseURL: "https://slashi-mobile-default-rtdb.firebaseio.com/",

    projectId: "slashi-mobile",

    storageBucket: "slashi-mobile.appspot.com",

    messagingSenderId: "616506166804",

    appId: "1:616506166804:web:feb1b54c87c7b8ea0c6101"

};


firebase.initializeApp(firebaseConfig)

export { firebase }