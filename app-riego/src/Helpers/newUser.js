import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const NewUser = (email) => {
    const [userId, setUserId] = useState()

    const user = {
        email: email,
        valvulas: [{tiempoRiego: 0, horaRiego: 0}]
    }

    const db = getFirestore()
    
    const userCollection = collection(db, "users");

    addDoc(userCollection, user).then((id)=>setUserId(id));


}
