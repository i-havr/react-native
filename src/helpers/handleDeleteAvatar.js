import { auth, myStorage } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

export const handleDeleteAvatar = async (
  avatarUri,
  setIsLoading,
  setAvatarUri
) => {
  try {
    setIsLoading(true);
    if (avatarUri.startsWith("https")) {
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });

      const avatarRef = ref(myStorage, avatarUri);
      await deleteObject(avatarRef);
    }
    setAvatarUri(null);
  } catch (error) {
    console.log("handleDeleteAvatar: ", error);
  } finally {
    setIsLoading(false);
  }
};
