import { initializeApp } from "firebase/app";
import { getAuth,
         createUserWithEmailAndPassword , 
         signInWithEmailAndPassword ,
         onAuthStateChanged, 
         signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { getStorage } from"firebase/storage";
const firebaseConfig = {
  apiKey:process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_ID
};

const firebase=initializeApp(firebaseConfig);
const auth= getAuth();
export default firebase;
export function signup(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email,password){
    return signInWithEmailAndPassword(auth,email,password);
}
export function logout(){
    return signOut(auth);
}

export function useAuth(){
    const [currentUser,setCurrentUser]=useState();
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
        });
        return unsub;
    },[])
    return currentUser;
}
export const storage =getStorage(firebase);
