import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

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
