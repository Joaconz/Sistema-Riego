import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../Context/authContext";
import LoadingSpinnet from "../Helpers/LoadingSpinnet";

const Home = () => {
  const { user, logout, loading, userFirestore } = useAuth();

  const {email, valvulas} = userFirestore



  const [Valvulas, setValvulas]=useState([])

  
  useEffect(() => {
    const db = getFirestore()

    const q=query(
      collection(db, "users"),
      where("email", "==", email)
    );
    getDocs(q).then((resp)=>{
      if(resp.size===0){
        console.log('no existe')
      }
      else{
        console.log('existe')
        const destructuring = resp.docs.map((valv)=>({...valv.data()}))
        //console.log(destructuring[0].valvulas)
        setValvulas(destructuring[0].valvulas)
        console.log(Valvulas)
      }

    })
  }, [])




  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <LoadingSpinnet />;
  }

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      {Valvulas===undefined?
      <p>loading</p>
      :
      <>{Valvulas.map((valv)=>{
        <>
        <p>Hora de riego: {valv.horaRiego}</p>
        <p>Tiempo de riego: {valv.tiempoRiego} mins</p>
        </>
      })}
      </>
    
    }
      
    
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Home;
