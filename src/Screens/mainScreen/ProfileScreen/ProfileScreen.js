import React, { useState, useEffect } from "react";

import { useIsFocused } from "@react-navigation/native";

import {
  Text,
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../../redux/auth/authSlice";

import { db } from "../../../firebase/config";
import { collection, onSnapshot, where, query } from "firebase/firestore";

import { showErrorMessage } from "../../../helpers";
import { handleDeleteAvatar } from "../../../services";

import { Post } from "../../../components/Post";
import { LogoutIconWrapper } from "../../../components/LogoutIconWrapper";
import { AwatarWrapper } from "../../../components/AvatarWrapper/AvatarWrapper";

import bgImage from "../../../../assets/images/bg.jpg";

import { styles } from "./ProfileScreen.styles";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [avatarUri, setAvatarUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { userId, avatar, login } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  useEffect(() => {
    setAvatarUri(avatar);

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
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .sort((a, b) => b.createdAt - a.createdAt);
            setPosts(sortedData);
          },
          () => {}
        );
      } catch (error) {
        showErrorMessage(error.message);
      }
    };

    getPosts();
  }, [isFocused, avatar]);

  const deleteAvatar = () => {
    handleDeleteAvatar(avatarUri, setIsLoading, setAvatarUri);
    dispatch(updateUserProfile({ avatar: null }));
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator color="#FF6C00" size="large" />
        </View>
      )}
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.contentWrapper}>
          <LogoutIconWrapper />
          <AwatarWrapper
            avatarUri={avatarUri}
            setIsLoading={setIsLoading}
            setAvatarUri={setAvatarUri}
            deleteAvatar={deleteAvatar}
            isCheckButton={true}
          />
          <Text style={styles.text}>{login}</Text>
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
      </ImageBackground>
    </View>
  );
}
