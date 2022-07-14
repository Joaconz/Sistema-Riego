import { getDocs } from "firebase/firestore";

export const getDocsFromFirebase = (FirebaseItems, functionSet) => {
    getDocs(FirebaseItems)
        .then((resp) => {
          if (resp.size === 0) {
            console.log("No existe");
          } else {
            functionSet(
              resp.docs.map((prod) => ({ id: prod.id, ...prod.data() }))
            );
          }
        })

        .catch((err) => console.log(err));
  }