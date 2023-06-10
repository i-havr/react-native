import { db } from "../firebase/config";
import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";

import { uploadImageToServer } from "./imagesService";

export const getCurrentUserComment = async (
  userId,
  postId,
  commentId,
  setIsCurrentUserComment
) => {
  try {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    const commentSnap = await getDoc(commentRef);

    if (commentSnap.data().userId === userId) {
      setIsCurrentUserComment(true);
    } else {
      setIsCurrentUserComment(false);
    }
  } catch (error) {
    console.log("getCurrentUserComment", error);
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
