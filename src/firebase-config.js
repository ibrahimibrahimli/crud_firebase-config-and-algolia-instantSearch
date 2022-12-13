import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyC3KSjYuLJBV6ba9E0Fd0fKSqcC9hAGvuQ",
    authDomain: "crud-project-main.firebaseapp.com",
    projectId: "crud-project-main",
    storageBucket: "crud-project-main.appspot.com",
    messagingSenderId: "633606396405",
    appId: "1:633606396405:web:1fc7339e5c89e89bbda8bc",
    measurementId: "G-5T327FN2HB"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
