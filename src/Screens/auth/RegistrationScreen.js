import React, { useState } from "react";

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

import bgImage from "../../../assets/images/bg.jpg";
import Avatar from "../../../assets/images/avatar.png";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [formData, setFormData] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const navigation = useNavigation();

  const addImage = () => {
    console.log("Click Add Image Icon!");
  };

  const handleSubmit = () => {
    const { login, email, password } = formData;

    if (
      login.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      console.log("All fields are required!");
      return;
    }

    const normalizedFormData = {
      login: login.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    Keyboard.dismiss();
    setFormData(initialState);
    navigation.navigate("Home");
    console.log(normalizedFormData, "Register data has been sent");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.formWrapper}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarFrame}></View>
                <TouchableOpacity onPress={addImage} activeOpacity={0.7}>
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
                      // onFocus={() => {
                      //   setIsShowKeyboard(true);
                      // }}
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
                      // onFocus={() => {
                      //   setIsShowKeyboard(true);
                      // }}
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
