import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import { db, myStorage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { Camera } from "expo-camera";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { resizeImage } from "../../helpers/resizeImage";

const initialState = {
  title: "",
  locationTitle: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);

  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [snap, setSnap] = useState(null);
  const [photoUri, setPhotoUri] = useState("");

  const { userId, login } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  const { title, locationTitle } = formData;

  const isSubmitButtonActive =
    photoUri && title.length && locationTitle.length ? true : false;

  const isDeleteButtonActive =
    photoUri || title.length || locationTitle.length ? true : false;

  useEffect(() => {
    setPhotoUri("");
    setLocation(null);

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    try {
      if (snap) {
        const photo = await snap.takePictureAsync();

        const uri = await resizeImage(photo.uri);

        setPhotoUri(uri);

        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      }
    } catch (error) {
      console.log("takePhoto: ", error);
    }
  };

  const handleSelectPhoto = async () => {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
        base64: true,
      });

      const uri = await resizeImage(photo.assets[0].uri);

      setPhotoUri(uri);

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    } catch (error) {
      console.log("handleSelectPhoto: ", error);
    }
  };

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(photoUri);

      const file = await response.blob();

      const photoRef = await ref(myStorage, `postImages/${uniquePostId}`);

      await uploadBytes(photoRef, file);

      const downloadURL = await getDownloadURL(photoRef);
      return downloadURL;
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPostToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const downloadURL = await uploadPhotoToServer();

      const createPost = doc(db, "posts", uniquePostId);

      await setDoc(createPost, {
        downloadURL,
        userId,
        login,
        formData,
        location,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log("uploadPostToServer: ", error.message);
    }
  };

  const handleSubmit = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen", {
      photoUri,
      location,
      formData,
    });
    setPhotoUri("");
    setLocation(null);
    setFormData(initialState);
  };

  const handleDelete = () => {
    setPhotoUri("");
    setLocation(null);
    setFormData(initialState);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.text}>Create a post</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={0.7}
          >
            <View style={styles.arrowWrapper}>
              <Feather name="arrow-left" size={24} color="#BDBDBD" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.contentWrapper}>
          <View>
            <View style={styles.cameraWrapper}>
              <View style={styles.iconWrapper}>
                {!photoUri ? (
                  <TouchableOpacity onPress={takePhoto} activeOpacity={0.3}>
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                      style={styles.cameraIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setPhotoUri("")}
                    activeOpacity={0.3}
                  >
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
                  ></Camera>
                )
              )}
            </View>
            <TouchableOpacity onPress={handleSelectPhoto} activeOpacity={0.3}>
              <Text style={styles.uploadText}>Upload image</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
              style={{ marginBottom: 32 }}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      title: value,
                    }))
                  }
                  value={formData.title}
                  placeholder="Title..."
                  keyboardType="default"
                  placeholderTextColor="#BDBDBD"
                />
              </View>

              <View>
                <Feather
                  name="map-pin"
                  size={22}
                  color="#BDBDBD"
                  style={styles.mapPin}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    position: "relative",
                    paddingLeft: 28,
                    marginBottom: 0,
                  }}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      locationTitle: value,
                    }))
                  }
                  value={formData.locationTitle}
                  placeholder="Location..."
                  keyboardType="default"
                  placeholderTextColor="#BDBDBD"
                />
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitButtonActive ? false : true}
              style={{
                ...styles.createPostButton,
                backgroundColor: isSubmitButtonActive ? "#FF6C00" : "#F6F6F6",
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  ...styles.textBtn,
                  color: isSubmitButtonActive ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            style={{
              marginBottom: 4,
            }}
            behavior="height"
          >
            <TouchableOpacity
              disabled={isDeleteButtonActive ? false : true}
              onPress={handleDelete}
              style={{
                ...styles.deleteButton,
                backgroundColor: isDeleteButtonActive ? "#DC143C" : "#F6F6F6",
              }}
              activeOpacity={0.7}
            >
              <Feather
                name="trash-2"
                size={22}
                color={isDeleteButtonActive ? "#FFFFFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 54,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth: 0.5,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  arrowWrapper: {
    position: "absolute",
    left: 16,
    bottom: "50%",
    transform: [{ translate: [0, 3] }],
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  cameraWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "100%",
    height: 240,
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: {
    position: "absolute",
    top: 0,
    flex: 1,
    width: "100%",
    height: "154%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  iconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    zIndex: 2,
  },
  previewImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  uploadText: {
    marginBottom: 28,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
  },
  input: {
    marginBottom: 8,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
  },
  createPostButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  deleteButton: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    opacity: 1,
  },
  mapPin: {
    position: "absolute",
    left: 0,
    transform: [{ translate: [0, 16] }],
  },
});
