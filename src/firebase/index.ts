// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlT1WtZbQOkGhLonmdqP2qiXSeOIJTSEM",
  authDomain: "calendar-app-e1306.firebaseapp.com",
  databaseURL: "https://calendar-app-e1306-default-rtdb.firebaseio.com",
  projectId: "calendar-app-e1306",
  storageBucket: "calendar-app-e1306.appspot.com",
  messagingSenderId: "1046704469054",
  appId: "1:1046704469054:web:9ca072dc129c9ac298cd6f",
  measurementId: "G-FLP02L6Y2N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app)