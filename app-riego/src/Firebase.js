// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt_50lvAYmsxsBfz77OIXRBtzfHhqYPaY",
  authDomain: "huerta-ninos.firebaseapp.com",
  databaseURL: "https://huerta-ninos-default-rtdb.firebaseio.com",
  projectId: "huerta-ninos",
  storageBucket: "huerta-ninos.appspot.com",
  messagingSenderId: "816708523077",
  appId: "1:816708523077:web:56b140548c9abdadef7f2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);