import { myStorage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
