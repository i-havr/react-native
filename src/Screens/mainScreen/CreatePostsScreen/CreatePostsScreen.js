import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";

import { CameraWrapper } from "../../../components/CameraWrapper";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import {
  resizeImage,
  uploadPostToServer,
  handleSelectImage,
} from "../../../helpers";

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

  const { userId, login } = useSelector((state) => state.auth);

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
    };
    setLocation(coords);
  };

  const selectImage = async () => {
    await handleSelectImage(setIsLoading, setPhotoUri, [3, 2]);
    addImageLocation();
  };

  const handleSubmit = () => {
    uploadPostToServer(photoUri, userId, login, formData, location);

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
            {/* klsdfjsdklfjdsklf */}
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
