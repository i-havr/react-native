import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { db } from "../../firebase/config";
import { collection, getCountFromServer } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";
import messageCircle from "../../../assets/icons/message-circle.png";
import { updateString } from "../../helpers";

import { styles } from "./Post.styles";

export const Post = ({ post, navigation }) => {
  const [commentsQty, setCommentsQty] = useState(0);

  useEffect(() => {
    try {
      const updateCommentsQty = async () => {
        const commentsRef = collection(db, "posts", post.id, "comments");

        const snapshot = await getCountFromServer(commentsRef);
        setCommentsQty(snapshot.data().count);
      };

      updateCommentsQty();
    } catch (error) {
      console.log("Post ====>>>", error.message);
    }
  }, [post]);

  const comment = (postId, downloadURL) => {
    navigation.navigate("CommentsScreen", { postId, downloadURL });
  };

  const like = () => {
    console.log("Click LIKE Icon!");
  };

  const showMap = (location) => {
    if (location) {
      navigation.navigate("MapScreen", { location });
    } else {
      console.log("There is no any information about location");
    }
  };
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
            <TouchableOpacity onPress={like} activeOpacity={0.7}>
              <Feather
                name="thumbs-up"
                size={20}
                color="#FF6C00"
                style={styles.likesIcon}
              />
            </TouchableOpacity>
            <Text style={styles.likesNumber}>500</Text>
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
};
