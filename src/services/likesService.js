import { db } from "../firebase/config";

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  getCountFromServer,
} from "firebase/firestore";

export const uploadLikeInfoToServer = async (postId, userId) => {
  try {
    const likeRef = doc(db, "posts", postId, "likes", userId);

    await setDoc(likeRef, {
      userId,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log("uploadLikeInfoToServer", error);
  }
};

export const isAlreadyLiked = async (postId, userId, setIsLiked) => {
  try {
    const likesRef = await collection(db, "posts", postId, "likes");

    onSnapshot(likesRef, (data) => {
      setIsLiked(
        data.docs.some(async (like) => {
          (await like.data().userId) === userId;
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLike = async (postId, userId) => {
  try {
    const likeRef = await doc(db, "posts", postId, "likes", userId);
    await deleteDoc(likeRef);
  } catch (error) {
    console.log(error);
  }
};

export const updateLikesQty = async (postId) => {
  try {
    const likesRef = collection(db, "posts", postId, "likes");

    const snapshot = await getCountFromServer(likesRef);
    const count = await snapshot.data().count;

    return count;
  } catch (error) {
    console.log("updateLikesQty: ", error);
  }
};
