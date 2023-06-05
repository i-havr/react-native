import { app, myStorage } from "../../firebase/config";

import {
  onAuthStateChanged,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { ref } from "firebase/storage";

import authSlice from "./authSlice";

const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

const auth = getAuth(app);

export const register =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
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
    } catch (error) {
      console.log("createUserWithEmailAndPassword: ", error);
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("login: ", error);
    }
  };

export const authChangeStatus = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = auth.currentUser;

        console.log("onAuthStateChanged -> uid ===>>>> ", uid);
        console.log("onAuthStateChanged -> displayName ===>>>> ", displayName);
        console.log("onAuthStateChanged -> email ===>>>> ", email);
        console.log("onAuthStateChanged -> photoURL ===>>>> ", photoURL);

        if (photoURL === undefined) {
          return;
        }

        const { avatar, stateChange } = getState().auth;

        console.log("onAuthStateChanged -> avatar ===>>>> ", avatar);
        console.log("onAuthStateChanged -> stateChange ===>>>> ", stateChange);

        const avatarRef = ref(myStorage, avatar);

        dispatch(
          updateUserProfile({
            userId: uid,
            login: displayName,
            userEmail: email,
            avatar: photoURL,
          })
        );

        !stateChange && dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log("authChangeStatus: ", error);
  }
};

export const logOut = () => async (dispatch, getState) => {
  try {
    await auth.signOut();
    dispatch(authLogOut());
  } catch (error) {
    console.log("logOut: ", error);
  }
};
