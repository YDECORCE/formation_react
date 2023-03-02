import {initializeApp} from 'firebase/app';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDHGCGRnmnpPHgO-0fH9hCyi0gonbDDagA",
    authDomain: "marvelquizz-3df74.firebaseapp.com",
    projectId: "marvelquizz-3df74",
    storageBucket: "marvelquizz-3df74.appspot.com",
    messagingSenderId: "53757109",
    appId: "1:53757109:web:fed9756e7093530604aafc"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

const db = getFirestore(app);

export const user = uid =>doc(db,`users/${uid}`);





