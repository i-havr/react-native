import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useDispatch } from "react-redux";

import { db } from "../../firebase/config";
import { collection, onSnapshot, where, query } from "firebase/firestore";

import { logOut } from "../../redux/auth/authOperations";

import { Feather } from "@expo/vector-icons";
import messageCircle from "../../../assets/icons/message-circle.png";
import { updateString } from "../../helpers/updateString";
import { getRandomNumber } from "../../helpers/getRandomNumber";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const { userId, login, userEmail, avatar } = useSelector(
    (state) => state.auth
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "flex" },
      });

    const getPosts = async () => {
      try {
        const database = await query(
          collection(db, "posts"),
          where("userId", "==", userId)
        );

        onSnapshot(
          database,
          (data) => {
            const sortedData = data.docs
              .map((doc) => ({ id: doc.id, ...doc.data() }))
              .sort((a, b) => b.createdAt - a.createdAt);
            setPosts(sortedData);
          },
          () => {}
        );
      } catch (error) {
        console.log("getPosts: ", error);
      }
    };
    getPosts();
  }, [isFocused]);

  const userSignOut = () => {
    dispatch(logOut());
  };

  const comment = (postId, downloadURL) => {
    navigation.navigate("CommentsScreen", { postId, downloadURL });
  };

  const like = () => {
    console.log("Click LIKE Icon!");
  };

  const showMap = (location) => {
    navigation.navigate("MapScreen", { location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.text}>Publications</Text>
        <TouchableOpacity onPress={userSignOut} activeOpacity={0.7}>
          <View style={styles.logoutIconWrapper}>
            <Feather name="log-out" size={22} style={styles.logoutIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.textWrapper}>
            <Text style={styles.textName}>{login}</Text>
            <Text style={styles.textEmail}>{userEmail}</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.postWrapper}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.downloadURL }}
                  style={styles.postImage}
                />
              </View>
              <Text style={styles.postTitle}>{item.formData.title}</Text>
              <View style={styles.postDetails}>
                <View style={styles.reactionWrapper}>
                  <View style={styles.commentsWrapper}>
                    <TouchableOpacity
                      onPress={() => comment(item.id, item.downloadURL)}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={messageCircle}
                        style={styles.commentsIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.commentsNumber}>5</Text>
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
                    <Text style={styles.likesNumber}>{getRandomNumber()}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => showMap(item.location)}
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
                      {updateString(item.formData.locationTitle)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
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
  logoutIconWrapper: {
    position: "absolute",
    right: 16,
    bottom: "50%",
    transform: [{ translate: [0, 4] }],
  },
  logoutIcon: {
    width: 24,
    height: 24,
    color: "#BDBDBD",
    opacity: 0.5,
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    flexDirection: "row",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  textWrapper: {
    justifyContent: "center",
  },
  textName: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontSize: 13,
    color: "#212121",
    lineHeight: 15,
  },
  textEmail: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 11,
    color: "#212121",
    lineHeight: 13,
    opacity: 0.8,
  },
  postWrapper: {
    marginBottom: 34,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reactionWrapper: {
    flexDirection: "row",
    gap: 24,
  },
  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsIcon: {
    width: 25,
    height: 25,
    marginRight: 6,
  },
  commentsNumber: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesIcon: {
    marginRight: 6,
  },
  likesNumber: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationWrapper: {
    flexDirection: "row",
  },
  mapPin: {
    marginRight: 6,
  },
  locationText: {
    textDecorationLine: "underline",
  },
});
