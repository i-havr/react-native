import { db } from "../firebase/config";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { uploadImageToServer } from "./uploadImageToServer";

export const uploadPostToServer = async (
  photoUri,
  userId,
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
