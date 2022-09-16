import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDxFjaDCyqgxQFReF2Q_1ohqPI7zRcimc",
  authDomain: "l0g-tracker-e1616.firebaseapp.com",
  databaseURL: "https://l0g-tracker-e1616-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "l0g-tracker-e1616",
  storageBucket: "l0g-tracker-e1616.appspot.com",
  messagingSenderId: "54238228783",
  appId: "1:54238228783:web:0b56bdbba5e2fd7392b1da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



