import React from "react";
import { View, TextInput, Platform, KeyboardAvoidingView } from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./CreatePostsInput.styles";

export const CreatePostsInput = ({ formData, setFormData }) => {
  return (
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
  );
};
