
import {
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { useState } from "react";

export const NewUser = (email) => {
  const [userId, setUserId] = useState();

  const db = getFirestore();

  const usersCollection = collection(db, "users");
  addDoc(usersCollection, email).then(({ id }) => setUserId(id));

  console.log(userId);
};
