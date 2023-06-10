import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { showErrorMessage } from "../../../helpers";
import { uploadImageToServer } from "../../../services";

import { register } from "../../../redux/auth/authOperations";

import { AwatarWrapper } from "../../../components/AvatarWrapper/AvatarWrapper";
import { RegisterInput } from "../../../components/RegisterInput";

import bgImage from "../../../../assets/images/bg.jpg";
import { styles } from "./RegistrationScreen.styles";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function RegistrationScreen() {
  const [formData, setFormData] = useState(initialState);
  const [avatarUri, setAvatarUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const avatar = await uploadImageToServer(avatarUri, "avatars");

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
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAvatar = () => {
    setAvatarUri(null);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator color="#FF6C00" size="large" />
        </View>
      )}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.formWrapper}>
              <AwatarWrapper
                avatarUri={avatarUri}
                setIsLoading={setIsLoading}
                setAvatarUri={setAvatarUri}
                deleteAvatar={deleteAvatar}
                isCheckButton={false}
              />

              <Text style={styles.text}>Registration</Text>

              <RegisterInput formData={formData} setFormData={setFormData} />

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
