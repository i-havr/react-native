import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useDispatch } from "react-redux";

import { db } from "../../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

import { logOut } from "../../../redux/auth/authOperations";

import { showErrorMessage } from "../../../helpers";

import { Feather } from "@expo/vector-icons";
import { Post } from "../../../components/Post";

import { styles } from "./DefaultScreenPosts.styles";

export default function DefaultScreenPosts({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [avatarUri, setAvatarUri] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { login, userEmail, avatar } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "flex" },
      });

    setAvatarUri(avatar);
    setIsLoading(true);

    const getPosts = async () => {
      try {
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
        showErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [isFocused, avatar]);

  const userSignOut = () => {
    dispatch(logOut());
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
            <Post
              post={item}
              navigation={navigation}
              setIsLoading={setIsLoading}
            />
          )}
        />
      </View>
    </View>
  );
}
