import {
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./CommentInput.styles";

export const CommentInput = ({
  commentText,
  handleSubmitComment,
  setCommentText,
}) => {
  return (
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
  );
};
