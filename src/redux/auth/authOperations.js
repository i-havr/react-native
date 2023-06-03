import { app, auth } from "../../firebase/config";

import {
  getAuth,
  setPersistence,
  onAuthStateChanged,
  browserLocalPersistence,
} from "firebase/auth";

import authSlice from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

export const register =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      await auth.currentUser.updateProfile({
        displayName: login,
        photoURL: avatar,
      });

      const {
        uid,
        displayName,
        email: userEmail,
        photoURL,
      } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          userEmail,
          avatar: photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.log(error.message);
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      // await auth.setPersistence(getAuth(app), browserLocalPersistence);
      await auth.signInWithEmailAndPassword(email, password);

      const {
        uid,
        displayName,
        email: userEmail,
        photoURL,
      } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          userEmail,
          avatar: photoURL,
        })
      );
    } catch (error) {
      console.log("login error: ", error.message);
    }
  };

export const authChangeStatus = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = auth.currentUser;

        dispatch(
          updateUserProfile({
            userId: uid,
            login: displayName,
            userEmail: email,
            avatar: photoURL,
          })
        );

        dispatch(authStateChange({ stateChange: true }));
        return;
      }
    });
  } catch (error) {
    console.log("Error in authStateChange ==>> ", error.message);
  }
};

export const logOut = () => async (dispatch, getState) => {
  try {
    await auth.signOut();
    dispatch(authLogOut());
  } catch (error) {
    console.log("logout error: ", error.message);
  }
};
