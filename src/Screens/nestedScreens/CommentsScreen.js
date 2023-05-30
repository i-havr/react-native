import React, { useState, useEffect } from "react";

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

import { Feather } from "@expo/vector-icons";

export default function CommentsScreen({ route, navigation }) {
  const [commentText, setCommentText] = useState("");
  const [photoUri, setPhotoUri] = useState(() => route.params.photoUri);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    }
  }, []);

  const handleSubmitComment = () => {
    console.log("The message has been sent: ", commentText);
    setCommentText("");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.text}>Comments</Text>
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
          <View style={styles.imageWrapper}>
            <Image source={{ uri: photoUri }} style={styles.postImage} />
          </View>
          <View style={styles.comments}>
            <View style={styles.commentWrapper}></View>
          </View>
          <KeyboardAvoidingView
            style={styles.inputWrapper}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setCommentText(value)}
                value={commentText}
                placeholder="Comment..."
                keyboardType="default"
                placeholderTextColor="#BDBDBD"
              />
              <TouchableOpacity
                onPress={handleSubmitComment}
                disabled={commentText.length ? false : true}
                activeOpacity={0.7}
                style={styles.iconWrapper}
              >
                <Feather
                  name="arrow-up"
                  size={22}
                  color="#FFFFFF"
                  style={{
                    ...styles.inputIcon,
                    backgroundColor: commentText.length ? "#FF6C00" : "#BDBDBD",
                  }}
                />
              </TouchableOpacity>
            </View>
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
    // backgroundColor: "red",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    backgroundColor: "blue",
    width: "100%",
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    flex: 1,
    resizeMode: "cover",
  },
  inputWrapper: {
    position: "absolute",
    flexDirection: "row",
    bottom: 16,
    left: 16,
    width: "100%",
    height: 50,
    paddingLeft: 16,
    paddingRight: 56,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
  },
  input: {
    position: "relative",
    minWidth: "100%",
    height: 48,
    paddingVertical: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
  },
  iconWrapper: {
    position: "absolute",
    right: 0,
  },
  inputIcon: {
    width: 34,
    height: 34,
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ translate: [48, 7] }],
    backgroundColor: "#FF6C00",
    borderRadius: 17,
    zIndex: 1,
  },
});
