import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { getAuth } from "firebase/auth";
import { app } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";
import messageCircle from "../../../assets/icons/message-circle.png";
import { updateString, showErrorMessage } from "../../helpers";
import {
  isAlreadyLiked,
  uploadLikeInfoToServer,
  deleteLike,
  updateCommentsQty,
  updateLikesQty,
} from "../../services";

import { styles } from "./Post.styles";

const auth = getAuth(app);

export const Post = ({ post, navigation, setIsLoading }) => {
  const [commentsQty, setCommentsQty] = useState(null);
  const [likesQty, setLikesQty] = useState(null);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    try {
      const updateCommentsAndLikesQty = async () => {
        const likesCount = await updateLikesQty(post.id);
        const commentsCount = await updateCommentsQty(post.id);
        setLikesQty(likesCount);
        setCommentsQty(commentsCount);
      };

      updateCommentsAndLikesQty();
    } catch (error) {
      console.log("Post ====>>>", error.message);
    }
  }, [post, isLiked]);

  const comment = (postId, downloadURL) => {
    navigation.navigate("CommentsScreen", { postId, downloadURL });
  };

  const likeToggle = async () => {
    const { uid: userId } = await auth.currentUser;

    if (!isLiked) {
      try {
        setIsLoading(true);
        await uploadLikeInfoToServer(post.id, userId);
      } catch (error) {
        showErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await deleteLike(post.id, userId);
      } catch (error) {
        showErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    await isAlreadyLiked(post.id, userId, setIsLiked);
  };

  const showMap = (location) => {
    if (location) {
      navigation.navigate("MapScreen", { location });
    } else {
      showErrorMessage("There is no information about location");
    }
  };

  if (likesQty !== null && commentsQty !== null) {
    return (
      <View style={styles.postWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: post.downloadURL }} style={styles.postImage} />
        </View>
        <Text style={styles.postTitle}>{post.formData.title}</Text>
        <View style={styles.postDetails}>
          <View style={styles.reactionWrapper}>
            <View style={styles.commentsWrapper}>
              <TouchableOpacity
                onPress={() => comment(post.id, post.downloadURL)}
                activeOpacity={0.7}
              >
                <Image source={messageCircle} style={styles.commentsIcon} />
              </TouchableOpacity>
              <Text style={styles.commentsNumber}>{commentsQty}</Text>
            </View>
            <View style={styles.likesWrapper}>
              <TouchableOpacity onPress={likeToggle} activeOpacity={0.7}>
                <Feather
                  name="thumbs-up"
                  size={20}
                  color="#FF6C00"
                  style={styles.likesIcon}
                />
              </TouchableOpacity>
              <Text style={styles.likesNumber}>{likesQty}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => showMap(post.location)}
            activeOpacity={0.4}
          >
            <View style={styles.locationWrapper}>
              <Feather
                name="map-pin"
                size={20}
                color="#BDBDBD"
                style={styles.mapPin}
              />
              <Text style={styles.locationText}>
                {updateString(post.formData.locationTitle)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
