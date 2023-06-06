import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { app, db, myStorage } from "../../firebase/config";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from "react-native";

import authSlice from "../../redux/auth/authSlice";
const { updateUserProfile } = authSlice.actions;

import { SimpleLineIcons } from "@expo/vector-icons";

import { logOut } from "../../redux/auth/authOperations";

import { Feather } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { resizeImage } from "../../helpers/resizeImage";

import deleteAvatarIcon from "../../../assets/icons/cancel.png";
import messageCircle from "../../../assets/icons/message-circle.png";
import bgImage from "../../../assets/images/bg.jpg";
import { updateString } from "../../helpers/updateString";
import { getRandomNumber } from "../../helpers/getRandomNumber";

const auth = getAuth(app);

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [avatarUri, setAvatarUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId, avatar, login } = useSelector((state) => state.auth);

  useEffect(() => {
    setAvatarUri(avatar);

    const getPosts = async () => {
      try {
        setIsLoading(true);
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
        console.log("getPosts: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [avatar]);

  const handleSelectAvatar = async () => {
    try {
      setIsLoading(true);
      const avatar = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      const uri = await resizeImage(avatar.assets[0].uri);
      setAvatarUri(uri);
    } catch (error) {
      console.log("handleSelectAvatar: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setIsLoading(true);
      if (avatarUri.startsWith("https")) {
        await updateProfile(auth.currentUser, {
          photoURL: "",
        });

        const avatarRef = ref(myStorage, avatarUri);
        await deleteObject(avatarRef);
      }
      setAvatarUri(null);
      dispatch(updateUserProfile({ avatar: null }));
    } catch (error) {
      console.log("handleDeleteAvatar: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatarToServer = async () => {
    const uniqueAvatarId = Date.now().toString();

    if (avatarUri) {
      try {
        setIsLoading(true);
        const response = await fetch(avatarUri);

        const file = await response.blob();

        const avatarRef = await ref(myStorage, `avatars/${uniqueAvatarId}`);

        await uploadBytes(avatarRef, file);

        const downloadURL = await getDownloadURL(avatarRef);

        setAvatarUri(downloadURL);
        dispatch(updateUserProfile({ avatar: downloadURL }));

        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        return downloadURL;
      } catch (error) {
        console.log("uploadAvatarToServer: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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

  const showCheckButton = () => {
    return avatarUri && String(avatarUri) !== String(avatar) ? true : false;
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
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarFrame}>
              <Image
                source={avatarUri ? { uri: avatarUri } : null}
                style={styles.avatar}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => {}}>
              <TouchableOpacity
                onPress={avatarUri ? handleDeleteAvatar : handleSelectAvatar}
                activeOpacity={0.7}
              >
                {avatarUri ? (
                  <Image
                    source={deleteAvatarIcon}
                    style={styles.changeAvatarIcon}
                  />
                ) : (
                  <SimpleLineIcons
                    name="plus"
                    size={25}
                    color="#FF6C00"
                    style={styles.addAvatarIcon}
                  />
                )}
              </TouchableOpacity>
            </TouchableWithoutFeedback>

            {showCheckButton() && (
              <TouchableOpacity
                onPress={uploadAvatarToServer}
                activeOpacity={0.7}
              >
                <SimpleLineIcons
                  name="check"
                  size={45}
                  color="#32cd32"
                  style={styles.okIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.logoutIconWrapper}>
            <TouchableOpacity onPress={userSignOut} activeOpacity={0.7}>
              <Feather name="log-out" size={22} style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>{login}</Text>

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
                      <Text style={styles.commentsNumber}>10</Text>
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
                      <Text style={styles.likesNumber}>
                        {getRandomNumber()}
                      </Text>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  bgImage: {
    flex: 1,
  },
  contentWrapper: {
    position: "relative",
    flex: 1,
    marginTop: 147,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translate: [-44, -60] }],
  },
  avatarFrame: {
    position: "relative",
    width: "100%",
    height: "100%",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },
  avatar: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.1 }],
    resizeMode: "cover",
  },
  changeAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translate: [20, -10] }],
  },
  addAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translate: [12, -14] }],
  },
  okIcon: {
    position: "absolute",
    bottom: -30,
    right: 100,
    transform: [{ translate: [12, -14] }],
  },
  logoutIconWrapper: {
    position: "absolute",
    right: 16,
    top: 20,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    color: "#BDBDBD",
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.03,
    color: "#212121",
  },
  postWrapper: {
    justifyContent: "flex-start",
    marginBottom: 35,
    borderRadius: 8,
    // backgroundColor: "#F6F6F6",
    overflow: "hidden",
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
  loaderWrapper: {
    position: "absolute",
    top: 64,
    right: 16,
    zIndex: 3,
  },
});
