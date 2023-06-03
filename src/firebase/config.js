import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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

export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const myStorage = getStorage(app);
export const db = getFirestore(app);
