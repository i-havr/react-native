import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";

import { convertDateFormat } from "../../helpers/convertDateFormat";

export default function CommentsScreen({ route, navigation }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isPostOwner, setIsPostOwner] = useState(false);

  const { userId, avatar } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  const { postId, downloadURL } = route.params;

  const getPostOwner = async () => {
    try {
      const postsRef = await collection(db, "posts");

      onSnapshot(postsRef, (data) => {
        setIsPostOwner(
          data.docs.some(async (post) => {
            (await post.data().userId) === userId;
          })
        );
      });
    } catch (error) {
      console.log("getPostOwner", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    }

    const getComments = async () => {
      const commentsDB = await collection(db, "posts", postId, "comments");

      onSnapshot(
        commentsDB,
        (data) => {
          setComments(
            data.docs.map((comment) => ({ id: comment.id, ...comment.data() }))
          );
        },
        () => {}
      );
    };
    getComments();
  }, []);

  const uploadCommentToServer = async () => {
    const uniqueCommentId = Date.now().toString();

    try {
      const createComment = doc(
        db,
        "posts",
        postId,
        "comments",
        uniqueCommentId
      );

      await setDoc(createComment, {
        message: commentText,
        avatar,
        userId,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log("uploadCommentToServer", error);
    }
  };

  const handleSubmitComment = () => {
    uploadCommentToServer();
    getPostOwner();
    keyboardHide();
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
            <Image source={{ uri: downloadURL }} style={styles.postImage} />
          </View>

          <FlatList
            data={comments}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View
                  style={{
                    ...styles.commentWrapper,
                    flexDirection: isPostOwner ? "row-reverse" : "row",
                  }}
                >
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.commentAvatar}
                    />
                  </View>
                  <View style={styles.commentMessageWrapper}>
                    <Text style={styles.commentMessage}>{item.message}</Text>
                    <Text style={styles.commentCreatedAt}>
                      {convertDateFormat(item.createdAt.seconds)}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
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
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    width: "100%",
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
    backgroundColor: "#BDBDBD",
    overflow: "hidden",
  },
  postImage: {
    flex: 1,
  },
  comments: {
    width: "100%",
  },
  commentWrapper: {
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#BDBDBD",
    overflow: "hidden",
  },
  commentAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    resizeMode: "cover",
  },
  commentMessageWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: Dimensions.get("window").width - 76,
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentMessage: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentCreatedAt: {
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 10,
    color: "#BDBDBD",
  },
  inputWrapper: {
    flexDirection: "row",
    bottom: 16,
    width: Dimensions.get("window").width - 32,
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
    borderRadius: 17,
    zIndex: 1,
  },
});
