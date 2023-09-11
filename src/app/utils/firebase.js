
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

import { initializeApp, getApps } from "firebase/app";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "swim-starter-technical.firebaseapp.com",
  projectId: "swim-starter-technical",
  storageBucket: "swim-starter-technical.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

console.log(firebaseConfig)


const app = getApps().length ===0 ? initializeApp(firebaseConfig) : getApps()

const db = getFirestore(app)

const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()


export { db, auth, storage, provider}