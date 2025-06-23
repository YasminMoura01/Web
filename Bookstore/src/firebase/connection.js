import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw63pc_CcEWchSFMl9TVaNWc4xtH0If48",
  authDomain: "projeto-5a82e.firebaseapp.com",
  projectId: "projeto-5a82e",
  storageBucket: "projeto-5a82e.firebasestorage.app",
  messagingSenderId: "992408846968",
  appId: "1:992408846968:web:314d9034c8e559a9e5a38d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db };
