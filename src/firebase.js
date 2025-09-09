import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq7WazlervAe4NPo1b1KdIqjTLeVzCl_g",
  authDomain: "berstudio-6395d.firebaseapp.com",
  projectId: "berstudio-6395d",
  storageBucket: "berstudio-6395d.firebasestorage.app",
  messagingSenderId: "1011652387430",
  appId: "1:1011652387430:web:f559cbf391fd56616043a7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);