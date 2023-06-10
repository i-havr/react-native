import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { uploadImageToServer } from "./imagesService";

export const getPostOwner = async (userId, setIsPostOwner) => {
  try {
    const postsRef = await collection(db, "posts");

    onSnapshot(postsRef, (data) => {
      setIsPostOwner(
        data.docs.some(async (post) => {
          (await post.data().userId) === userId;
        })
      );
    });
  } catch (error) {
    console.log("getPostOwner", error);
  }
};

export const uploadPostToServer = async (
  photoUri,
  userId,
  email,
  login,
  formData,
  location
) => {
  const uniquePostId = Date.now().toString();

  try {
    const downloadURL = await uploadImageToServer(photoUri, "postImages");

    const createPost = doc(db, "posts", uniquePostId);

    await setDoc(createPost, {
      downloadURL,
      userId,
      email,
      login,
      formData,
      location,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log("uploadPostToServer: ", error.message);
  } finally {
  }
};
