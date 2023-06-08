import * as ImagePicker from "expo-image-picker";
import { resizeImage } from "./resizeImage";

export const handleSelectImage = async (setIsLoading, setImageUri, aspect) => {
  try {
    setIsLoading(true);
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
  } finally {
    setIsLoading(false);
  }
};
