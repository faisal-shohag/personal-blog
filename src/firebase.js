import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database"
import { getFirestore } from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import {PUBLIC_FIREAPI, PUBLIC_FIREAUTH, PUBLIC_FIREDB, PUBLIC_FIREID, PUBLIC_FIREBUCKET, PUBLIC_FIRESENDER, PUBLIC_FIREAPP, PUBLIC_FIREMEASURE} from '$env/static/public'
const firebaseConfig = {
  apiKey: PUBLIC_FIREAPI,
  authDomain: PUBLIC_FIREAUTH,
  databaseURL: PUBLIC_FIREDB,
  projectId: PUBLIC_FIREID,
  storageBucket: PUBLIC_FIREBUCKET,
  messagingSenderId: PUBLIC_FIRESENDER,
  appId: PUBLIC_FIREAPP,
  measurementId: PUBLIC_FIREMEASURE
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const fstore = getFirestore(app);
export const fauth = getAuth(app);
