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
  ActivityIndicator,
} from "react-native";

import { useDispatch } from "react-redux";

import { db } from "../../firebase/config";
import { collection, onSnapshot, where, query } from "firebase/firestore";

import { logOut } from "../../redux/auth/authOperations";

import { Feather } from "@expo/vector-icons";

import { Post } from "../../components/Post";

export default function DefaultScreenPosts({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [avatarUri, setAvatarUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setAvatarUri(avatar);

    const getPosts = async () => {
      try {
        setIsLoading(true);
        const database = await collection(db, "posts");

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
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [isFocused, avatar]);

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
        {isLoading && (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator color="#FF6C00" size="large" />
          </View>
        )}
        <Text style={styles.text}>Publications</Text>
        <TouchableOpacity onPress={userSignOut} activeOpacity={0.7}>
          <View style={styles.logoutIconWrapper}>
            <Feather name="log-out" size={22} style={styles.logoutIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.avatarWrapper}>
          <Image
            source={avatarUri ? { uri: avatar } : null}
            style={styles.avatar}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.textName}>{login}</Text>
            <Text style={styles.textEmail}>{userEmail}</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Post post={item} navigation={navigation} />
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
    backgroundColor: "#F6F6F6",
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
  loaderWrapper: {
    position: "absolute",
    bottom: -45,
    right: 16,
    zIndex: 3,
  },
});
