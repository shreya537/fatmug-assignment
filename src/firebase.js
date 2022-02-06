// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyDDloAADV0ZKIF2SMRPtdk45ZkYMZn9Jw8",

    authDomain: "shreya-article.firebaseapp.com",

    projectId: "shreya-article",

    storageBucket: "shreya-article.appspot.com",

    messagingSenderId: "526042026602",

    appId: "1:526042026602:web:40a707d70904225ccb3013",

    measurementId: "G-L363XP4VV0"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
export { db, auth };
