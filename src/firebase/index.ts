// @ts-nocheck

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "calendar-app-daon.firebaseapp.com",
  projectId: "calendar-app-daon",
  storageBucket: "calendar-app-daon.appspot.com",
  messagingSenderId: "311087437571",
  appId: "1:311087437571:web:3b656b0f800d5ea9253b36",
  measurementId: "G-975YSV1YEV",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
