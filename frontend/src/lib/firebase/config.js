import { initializeApp, getApps } from "firebase/app";
import "firebase/auth";

// Env variables will be exposed client-side here, but that's okay
// because they are public anyway
// TODO: Use a config file instead
const firebaseConfig = {
  apiKey: "AIzaSyB6oSPxspvfLlN04BW3Me5j8JQNoxebbHw",
  authDomain: "ptonsearch.firebaseapp.com",
  projectId: "ptonsearch",
  storageBucket: "ptonsearch.appspot.com",
  messagingSenderId: "485939616891",
  appId: "1:485939616891:web:c7869b217158c8da6496de",
  measurementId: "G-DL1QY5PFH0",
};

let firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
