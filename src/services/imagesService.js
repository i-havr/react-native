import { auth, myStorage } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

import { resizeImage } from "../helpers";

export const handleSelectImage = async (setImageUri, aspect) => {
  try {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 1,
      base64: true,
    });

    const uri = await resizeImage(image.assets[0].uri);
    setImageUri(uri);
  } catch (error) {
    console.log("handleSelectImage: ", error);
  }
};

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

export const uploadImageToServer = async (imageUri, prefixFolder) => {
  const uniquePostId = Date.now().toString();

  if (imageUri) {
    try {
      const response = await fetch(imageUri);

      const file = await response.blob();

      const imageRef = await ref(myStorage, `${prefixFolder}/${uniquePostId}`);

      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.log("uploadImageToServer: ", error);
    }
  }
};
