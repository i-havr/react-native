import { db } from "../firebase/config";

import {
  collection,
  doc,
  setDoc,
  Timestamp,
  getCountFromServer,
} from "firebase/firestore";

export const uploadCommentToServer = async (
  postId,
  avatar,
  userId,
  commentText
) => {
  const uniqueCommentId = Date.now().toString();

  try {
    const createComment = doc(db, "posts", postId, "comments", uniqueCommentId);

    await setDoc(createComment, {
      message: commentText,
      avatar,
      userId,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log("uploadCommentToServer", error);
  }
};

export const updateCommentsQty = async (postId) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");

    const snapshot = await getCountFromServer(commentsRef);
    const count = await snapshot.data().count;

    return count;
  } catch (error) {
    console.log("updateLikesQty: ", error);
  }
};
