import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  Image,
  Keyboard,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { db } from "../../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";

import { Comment } from "../../../components/Comment";
import { CommentInput } from "../../../components/CommentInput";

import { showErrorMessage } from "../../../helpers";

import { uploadCommentToServer } from "../../../services";

import { styles } from "./CommentsScreen.styles";

export default function CommentsScreen({ route, navigation }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const { userId, avatar } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  const { postId, downloadURL } = route.params;

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    }

    const getComments = async () => {
      try {
        const commentsDB = await collection(db, "posts", postId, "comments");

        onSnapshot(
          commentsDB,
          (data) => {
            setComments(
              data.docs.map((comment) => ({
                id: comment.id,
                ...comment.data(),
              }))
            );
          },
          () => {}
        );
      } catch (error) {
        showErrorMessage(error.message);
      }
    };

    getComments();
  }, []);

  const handleSubmitComment = () => {
    Keyboard.dismiss();
    setCommentText("");
    uploadCommentToServer(postId, avatar, userId, commentText);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            <Image source={{ uri: downloadURL }} style={styles.postImage} />
          </View>

          <FlatList
            data={comments}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Comment comment={item} userId={userId} postId={postId} />
            )}
          />
        </View>

        <CommentInput
          commentText={commentText}
          handleSubmitComment={handleSubmitComment}
          setCommentText={setCommentText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
