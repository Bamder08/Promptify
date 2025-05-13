import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvYlx24-8xiH1orKDuCMoK5W3H3mYUrzU",
  authDomain: "promptify-98939.firebaseapp.com",
  projectId: "promptify-98939",
  storageBucket: "promptify-98939.firebasestorage.app",
  messagingSenderId: "525029581000",
  appId: "1:525029581000:web:6db92567bd8def46d7c5fd",
  measurementId: "G-4387SBDY4T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);