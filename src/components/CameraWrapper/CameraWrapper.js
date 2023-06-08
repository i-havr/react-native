import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { resizeImage } from "../../helpers";

import { styles } from "./CameraWrapper.styles";

export const CameraWrapper = ({
  photoUri,
  setPhotoUri,
  snap,
  setSnap,
  addImageLocation,
}) => {
  const isFocused = useIsFocused();

  const takePhoto = async (snap, setPhotoUri, addImageLocation) => {
    try {
      if (snap) {
        const photo = await snap.takePictureAsync();

        const uri = await resizeImage(photo.uri);

        setPhotoUri(uri);
        addImageLocation();
      }
    } catch (error) {
      console.log("takePhoto: ", error);
    }
  };

  return (
    <View style={styles.cameraWrapper}>
      <View style={styles.iconWrapper}>
        {!photoUri ? (
          <TouchableOpacity
            onPress={() => takePhoto(snap, setPhotoUri, addImageLocation)}
            activeOpacity={0.3}
          >
            <MaterialIcons
              name="camera-alt"
              size={24}
              color="#BDBDBD"
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setPhotoUri("")} activeOpacity={0.3}>
            <MaterialIcons
              name="autorenew"
              size={24}
              color="#BDBDBD"
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {photoUri.length ? (
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
      ) : (
        isFocused && (
          <Camera
            ref={setSnap}
            style={styles.camera}
            ratio="1:1"
            zoom={0}
            type={Camera.Constants.Type.back}
          />
        )
      )}
    </View>
  );
};
