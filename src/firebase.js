import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyBg56M2d5Wek9tIo0ua1CO-wTHE7MucIA8",
  authDomain: "mini-chat-app-b3d70.firebaseapp.com",
  projectId: "mini-chat-app-b3d70",
  storageBucket: "mini-chat-app-b3d70.firebasestorage.app",
  messagingSenderId: "335739169420",
  appId: "1:335739169420:web:7ca03bc93cf46fc7c829a9",
  measurementId: "G-QP28M1KG7P"
}


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)