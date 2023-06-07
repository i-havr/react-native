import * as ImagePicker from "expo-image-picker";
import { resizeImage } from "./resizeImage";

export const handleSelectAvatar = async (setIsLoading, setAvatarUri) => {
  try {
    setIsLoading(true);
    const avatar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    const uri = await resizeImage(avatar.assets[0].uri);
    setAvatarUri(uri);
  } catch (error) {
    console.log("handleSelectAvatar: ", error);
  } finally {
    setIsLoading(false);
  }
};
