import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnVFBQCi2TUKnhpX0gwkVTUohC7dPMauw",
  authDomain: "react-native-news-app-2ff51.firebaseapp.com",
  projectId: "react-native-news-app-2ff51",
  storageBucket: "react-native-news-app-2ff51.appspot.com",
  messagingSenderId: "499522320195",
  appId: "1:499522320195:web:4463449188cffc9fba61f6",
};

let app;

if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(app);
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
