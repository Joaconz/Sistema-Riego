import { createContext, useContext, useEffect } from "react";
import { context } from "../Context/authContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
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
    onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
    })
  }, [])
  
  const logout = () => {
    signOut(auth)
  }

  return (
    <authContext.Provider value={{ signUp, login, logout, user }}>
      {children}
    </authContext.Provider>
  );
}
