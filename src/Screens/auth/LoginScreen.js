import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";

import { login } from "../../redux/auth/authOperations";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import bgImage from "../../../assets/images/bg.jpg";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [formData, setFormData] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const { email, password } = formData;

    if (email.trim().length === 0 || password.trim().length === 0) {
      console.log("All fields are required!");
      return;
    }

    const normalizedFormData = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    Keyboard.dismiss();
    dispatch(login(normalizedFormData));
    setFormData(initialState);
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
              <Text style={styles.text}>Login</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
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
                <View style={{ position: "relative" }}>
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
                    // onFocus={() => {
                    //   setIsShowKeyboard(true);
                    // }}
                  />
                  <TouchableOpacity
                    onPress={() => setIsHidePassword(!isHidePassword)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.showPasswordText}>Show</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.loginButton}
                activeOpacity={0.7}
              >
                <Text style={styles.textBtn}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
                activeOpacity={0.7}
              >
                <Text style={styles.textRegister}>
                  Don't have an account? Register
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
    width: "100%",
  },
  formWrapper: {
    height: "60.22%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
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
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    marginTop: 43,
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
  textRegister: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 19,
    color: "#1B4371",
  },
});
