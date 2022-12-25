// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";
import {getDatabase} from 'firebase/database';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcrMQaUieRYCe8QEPymt1ffsGruTWEktA",
  authDomain: "sample-ba110.firebaseapp.com",
  projectId: "sample-ba110",
  storageBucket: "sample-ba110.appspot.com",
  messagingSenderId: "358393474395",
  appId: "1:358393474395:web:df9789cffce41780e73e7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app)

export function useAuth(){
  const [user,setUser]=useState();
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,user=>setUser(user));
    return unsub;
  },[])
    
  return user;
}
