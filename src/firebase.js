import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIza",
  authDomain: "mini-chat-app-b3d70.firebaseapp.com",
  projectId: "mini-chat-app-b3d70",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-QP28M1KG7P"
}


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
