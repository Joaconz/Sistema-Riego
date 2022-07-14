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

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

  const signUp = (email, password) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password);
    //crear ususario firestore
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
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

  return (
    <authContext.Provider value={{ signUp, login, logout, loginWithGoogle, loading, user }}>
      {children}
    </authContext.Provider>
  );
}
