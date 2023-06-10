import { app } from "../../firebase/config";

import {
  onAuthStateChanged,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { updateUserProfile, authStateChange, authLogOut } from "./authSlice";

import { showErrorMessage } from "../../helpers";

const auth = getAuth(app);

export const register =
  ({ email, password, login, avatar }) =>
  async (dispatch) => {
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
      showErrorMessage(error.message);
    }
  };

export const login =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

export const authChangeStatus = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = auth.currentUser;

        const { stateChange } = getState().auth;

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
    showErrorMessage(error.message);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(authLogOut());
  } catch (error) {
    showErrorMessage(error.message);
  }
};
