import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD7OUVEGngVmFj-bS8T6GIxtRBnGPotPJc",
  authDomain: "blog-424dc.firebaseapp.com",
  databaseURL: "https://blog-424dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blog-424dc",
  storageBucket: "blog-424dc.appspot.com",
  messagingSenderId: "288552439869",
  appId: "1:288552439869:web:641123524ffaaf222d1a54",
  measurementId: "G-6DSSTNW7D8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const fstore = getFirestore(app);
