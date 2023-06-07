import { myStorage } from "../firebase/config";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadAvatarToServer = async (avatarUri, setAvatarUri) => {
  const uniquePostId = Date.now().toString();

  if (avatarUri) {
    try {
      const response = await fetch(avatarUri);

      const file = await response.blob();

      const avatarRef = await ref(myStorage, `avatars/${uniquePostId}`);

      await uploadBytes(avatarRef, file);

      const downloadURL = await getDownloadURL(avatarRef);

      setAvatarUri(downloadURL);

      return downloadURL;
    } catch (error) {
      console.log("uploadAvatarToServer: ", error);
    }
  }
};
