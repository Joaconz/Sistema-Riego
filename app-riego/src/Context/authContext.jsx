import { createContext, useContext, useEffect } from "react";
import { context } from "../Context/authContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../Firebase";
import { useState } from "react";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userFirestore, setUserFirestore] = useState({})


  const signUp = (email, password) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password);
    NewUser(email);
    
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
    loginUser(email);
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
        loginUser(currentUser.email)
    })

    return ()=> unsuscribe();
  }, [])
  
  const logout = () => {
    signOut(auth)
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const NewUser = (email) => {

    setUserFirestore({
      email: email,
      valvulas: [{tiempoRiego: 0, horaRiego: 0}]
    })

}

const loginUser = (email) => {
  setUserFirestore({
    email: email,
    valvulas: [{tiempoRiego: 0, horaRiego: 0}]
  })

  console.log(userFirestore)
}

const findUserData = () => {

}

  return (
    <authContext.Provider value={{ signUp, login, logout, loginWithGoogle, loading, user, userFirestore }}>
      {children}
    </authContext.Provider>
  );
}
