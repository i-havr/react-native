import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { db, myStorage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { resizeImage } from "../../helpers/resizeImage";

import { register } from "../../redux/auth/authOperations";

import bgImage from "../../../assets/images/bg.jpg";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function RegistrationScreen() {
  const [formData, setFormData] = useState(initialState);
  const [avatarUri, setAvatarUri] = useState(null);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSelectAvatar = async () => {
    try {
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
    }
  };

  const uploadAvatarToServer = async () => {
    const uniquePostId = Date.now().toString();

    if (avatarUri) {
      try {
        const response = await fetch(avatarUri);

        const file = await response.blob();

        const avatarRef = await ref(myStorage, `avatars/${uniquePostId}`);

        await uploadBytes(avatarRef, file);

        const downloadURL = await getDownloadURL(avatarRef);

        setAvatarUri(null);

        return downloadURL;
      } catch (error) {
        console.log("uploadAvatarToServer: ", error);
      }
    }
  };

  const handleSubmit = async () => {
    const avatar = await uploadAvatarToServer();

    setAvatarUri(avatar);

    const { email, password, login } = formData;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      login.trim().length === 0 ||
      !avatar
    ) {
      console.log("All fields are required!");
      return;
    }

    const normalizedFormData = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
      login: login.trim(),
      avatar,
    };

    Keyboard.dismiss();
    dispatch(register(normalizedFormData));
    setFormData(initialState);
    setAvatarUri(null);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.formWrapper}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarFrame}>
                  {avatarUri && (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleSelectAvatar}
                  activeOpacity={0.7}
                >
                  <SimpleLineIcons
                    name="plus"
                    size={25}
                    color="#FF6C00"
                    style={styles.addAvatarIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Registration</Text>
              <View>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <View style={{ marginBottom: 16 }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          login: value,
                        }))
                      }
                      value={formData.login}
                      placeholder="Login"
                      keyboardType="default"
                      placeholderTextColor="#BDBDBD"
                    />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
                      }
                      value={formData.email}
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor="#BDBDBD"
                    />
                  </View>
                  <View style={{ position: "relative", marginBottom: 43 }}>
                    <TextInput
                      style={{
                        ...styles.input,
                        paddingRight: 65,
                      }}
                      onChangeText={(value) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                      value={formData.password}
                      placeholder="Password"
                      secureTextEntry={isHidePassword ? true : false}
                      keyboardType="default"
                      placeholderTextColor="#BDBDBD"
                    />
                    <TouchableOpacity
                      onPress={() => setIsHidePassword(!isHidePassword)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.showPasswordText}>Show</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.registrationButton}
                activeOpacity={0.7}
              >
                <Text style={styles.textBtn}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.7}
              >
                <Text style={styles.textLogin}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  formWrapper: {
    height: "67.2%",
    position: "relative",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translate: [-44, -60] }],
  },
  avatarFrame: {
    position: "relative",
    width: "100%",
    height: "100%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.01 }],
  },
  addAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translate: [12, -14] }],
  },
  text: {
    textAlign: "center",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontStyle: "normal",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,
    color: "#212121",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  showPasswordText: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingTop: 16,
    paddingRight: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,
    color: "#1B4371",
  },
  registrationButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  textLogin: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,
    color: "#1B4371",
  },
});
