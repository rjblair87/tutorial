// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDGNl-0FiitolR8QBNAZaB-zeB_d3luwPU",
  authDomain: "bank-project-59976.firebaseapp.com",
  projectId: "bank-project-59976",
  storageBucket: "bank-project-59976.appspot.com",
  messagingSenderId: "768598439472",
  appId: "1:768598439472:web:37feeaad891fae76fc1ff5"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


export const db =  getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);