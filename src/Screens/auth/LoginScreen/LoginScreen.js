import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";

import { login } from "../../../redux/auth/authOperations";

import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { LoginInput } from "../../../components/LoginInput";

import bgImage from "../../../../assets/images/bg.jpg";

import { styles } from "./LoginScreen.styles";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [formData, setFormData] = useState(initialState);

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

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.formWrapper}>
              <Text style={styles.text}>Login</Text>

              <LoginInput formData={formData} setFormData={setFormData} />

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
