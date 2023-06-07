// import firebase from "firebase/compat/app";

import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJePPa24uZzOEembhWrAfdDTLp-vp21KE",
  authDomain: "awesome-react-native-project.firebaseapp.com",
  databaseURL:
    "https://awesome-react-native-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-react-native-project",
  storageBucket: "awesome-react-native-project.appspot.com",
  messagingSenderId: "20852670649",
  appId: "1:20852670649:web:3d1edc7a3b10a766539b68",
  measurementId: "G-P191LVV2MM",
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const myStorage = getStorage(app);
export const db = getFirestore(app);

// export const app = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();

// export const myStorage = getStorage(app);
// export const db = getFirestore(app);
