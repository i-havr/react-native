import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";

const initialState = {
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);

  const addImage = () => {
    console.log("Click Add Image!");
  };

  const handleSubmit = (event) => {
    console.log("Click on the createPostButton");

    const { title, location } = formData;
  };

  const handleDelete = (event) => {
    console.log("Click on the deleteButton");

    const { title, location } = formData;
  };

  return (
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
        <View style={styles.imageFrame}>
          <TouchableOpacity onPress={addImage} activeOpacity={0.7}>
            <View style={styles.imageWrapper}>
              <MaterialIcons
                name="camera-alt"
                size={24}
                color="#BDBDBD"
                style={styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.uploadText}>Upload image</Text>
        <View style={{ marginBottom: 24 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={{ marginBottom: 0 }}>
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
            <View style={{ marginBottom: 0 }}>
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
                }}
                onChangeText={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    location: value,
                  }))
                }
                value={formData.location}
                placeholder="Location..."
                keyboardType="default"
                placeholderTextColor="#BDBDBD"
              />
            </View>
          </KeyboardAvoidingView>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.createPostButton}
          activeOpacity={0.7}
        >
          <Text style={styles.textBtn}>Publish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteButton}
          activeOpacity={0.7}
        >
          <Feather name="trash-2" size={22} color={"#BDBDBD"} />
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageFrame: {
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
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
    color: "#BDBDBD",
    lineHeight: 19,
  },
  createPostButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  deleteButton: {
    width: 70,
    height: 40,
    marginTop: "auto",
    marginBottom: 4,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    opacity: 1,
  },
  mapPin: {
    position: "absolute",
    left: 0,
    transform: [{ translate: [0, 16] }],
  },
});
