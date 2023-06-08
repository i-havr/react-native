import { db } from "../firebase/config";
import { doc, setDoc, Timestamp } from "firebase/firestore";

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
