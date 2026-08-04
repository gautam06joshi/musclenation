import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD13HnC1vGGvYdBqv6yUK2Y_yuJioOg8ZI",
  authDomain: "musclenation-6a07e.firebaseapp.com",
  projectId: "musclenation-6a07e",
  storageBucket: "musclenation-6a07e.firebasestorage.app",
  messagingSenderId: "651331840670",
  appId: "1:651331840670:web:cc909b92a7fa782419e98f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);