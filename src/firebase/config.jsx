import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUq4LG_SP4ddwSbrzrFw6d1qswWYBtNp8",
  authDomain: "miniblog-4a045.firebaseapp.com",
  projectId: "miniblog-4a045",
  storageBucket: "miniblog-4a045.firebasestorage.app",
  messagingSenderId: "729478335922",
  appId: "1:729478335922:web:c5c1a278e9fa2c268fe8ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
