// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD1M5hF21qoKpr-r2bms9kMzbREipUty4g",
  authDomain: "alphabi-c29b8.firebaseapp.com",
  projectId: "alphabi-c29b8",
  storageBucket: "alphabi-c29b8.appspot.com",
  messagingSenderId: "946717241172",
  appId: "1:946717241172:web:f291417b923d6122cfa2c1",
  measurementId: "G-HQGEYPCQY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
