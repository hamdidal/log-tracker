import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLZAbQo0N0NxVHv6WRvkYIT5u1Q9owNQM",
  authDomain: "log-tracker-yedek-6c905.firebaseapp.com",
  projectId: "log-tracker-yedek-6c905",
  storageBucket: "log-tracker-yedek-6c905.appspot.com",
  messagingSenderId: "901421223261",
  appId: "1:901421223261:web:a1ff04df75b287251b2cb4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



