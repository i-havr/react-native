import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";

import { CameraWrapper } from "../../../components/CameraWrapper";
import { CreatePostsInput } from "../../../components/CreatePostsInput";
import { ButtonCustomized } from "../../../components/ButtonCustomized";

import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";

import { showErrorMessage } from "../../../helpers";
import { uploadPostToServer, handleSelectImage } from "../../../services";

const initialState = {
  title: "",
  locationTitle: "",
};

import { styles } from "./CreatePostsScreen.styles";

export default function CreatePostsScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [snap, setSnap] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { userId, userEmail, login } = useSelector((state) => state.auth);

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

  const addImageLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,

      // coords of Venice, Italy:
      // latitude: 45.434092,
      // longitude: 12.338497,
    };
    setLocation(coords);
  };

  const selectImage = async () => {
    try {
      await handleSelectImage(setPhotoUri, [3, 2]);
      addImageLocation();
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const handleSubmit = () => {
    uploadPostToServer(photoUri, userId, userEmail, login, formData, location);

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          {isLoading && (
            <View style={styles.loaderWrapper}>
              <ActivityIndicator color="#FF6C00" size="large" />
            </View>
          )}
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
            <CameraWrapper
              photoUri={photoUri}
              setPhotoUri={setPhotoUri}
              snap={snap}
              setSnap={setSnap}
              addImageLocation={addImageLocation}
            />
            <TouchableOpacity onPress={selectImage} activeOpacity={0.3}>
              <Text style={styles.uploadText}>Upload image</Text>
            </TouchableOpacity>
            <CreatePostsInput formData={formData} setFormData={setFormData} />

            <ButtonCustomized
              actionHandler={handleSubmit}
              isActive={isSubmitButtonActive}
              buttonStyle="createPostButton"
              bgColors={["#FF6C00", "#F6F6F6"]}
            >
              <Text
                style={{
                  ...styles.textBtn,
                  color: isSubmitButtonActive ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Publish
              </Text>
            </ButtonCustomized>
          </View>
          <KeyboardAvoidingView
            style={{
              marginBottom: 4,
            }}
            behavior="height"
          >
            <ButtonCustomized
              actionHandler={handleDelete}
              isActive={isDeleteButtonActive}
              buttonStyle="deleteButton"
              bgColors={["#DC143C", "#F6F6F6"]}
            >
              <Feather
                name="trash-2"
                size={22}
                color={isDeleteButtonActive ? "#FFFFFF" : "#BDBDBD"}
              />
            </ButtonCustomized>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
