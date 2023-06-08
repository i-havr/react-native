import React, { useState } from "react";

import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { styles } from "./LoginInput.styles";

export const LoginInput = ({ formData, setFormData }) => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  return (
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
        />
        <TouchableOpacity
          onPress={() => setIsHidePassword(!isHidePassword)}
          activeOpacity={0.7}
        >
          <Text style={styles.showPasswordText}>Show</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
