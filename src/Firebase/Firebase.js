// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS7AH7Qyv5jV-UAMjKXuSXvsfbRTmylDc",
  authDomain: "react-firebase-firestore-8beb8.firebaseapp.com",
  databaseURL: "https://react-firebase-firestore-8beb8-default-rtdb.firebaseio.com",
  projectId: "react-firebase-firestore-8beb8",
  storageBucket: "react-firebase-firestore-8beb8.appspot.com",
  messagingSenderId: "355494869266",
  appId: "1:355494869266:web:49fe5692a855c4f5431bcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore()