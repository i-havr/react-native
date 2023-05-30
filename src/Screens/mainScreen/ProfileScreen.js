import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import deleteAvatarIcon from "../../../assets/icons/cancel.png";
import messageCircle from "../../../assets/icons/message-circle.png";
import bgImage from "../../../assets/images/bg.jpg";
import postImage from "../../../assets/images/img_forest.png";
import Avatar from "../../../assets/images/avatar.png";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function ProfileScreen() {
  const [formData, setFormData] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const navigation = useNavigation();

  const logOut = () => {
    console.log("Click LOG OUT!");
  };

  const comment = () => {
    console.log("Click COMMENT Icon!");
  };

  const like = () => {
    console.log("Click LIKE Icon!");
  };

  const deleteImage = () => {
    console.log("Click DELETE IMAGE Icon!");
  };

  const handleSubmit = () => {
    const { login, email, password } = formData;

    if (
      login.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      console.log("All fields are required!");
      return;
    }

    const normalizedFormData = {
      login: login.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    Keyboard.dismiss();
    setFormData(initialState);
    navigation.navigate("Home");
    console.log(normalizedFormData, "Register data has been sent");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.contentWrapper}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarFrame}>
              <Image source={Avatar} style={styles.avatar} />
            </View>
            <TouchableOpacity onPress={deleteImage} activeOpacity={0.7}>
              <Image source={deleteAvatarIcon} style={styles.addAvatarIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.logoutIconWrapper}>
            <TouchableOpacity onPress={logOut} activeOpacity={0.7}>
              <Feather name="log-out" size={22} style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Natali Romanova</Text>
          <View style={styles.postWrapper}>
            <View style={styles.imageWrapper}>
              <Image source={postImage} style={styles.postImage} />
            </View>
            <Text style={styles.postTitle}>Forest</Text>
            <View style={styles.postDetails}>
              <View style={styles.reactionWrapper}>
                <View style={styles.commentsWrapper}>
                  <TouchableOpacity onPress={comment} activeOpacity={0.7}>
                    <Image source={messageCircle} style={styles.commentsIcon} />
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
                  <Text style={styles.likesNumber}>500</Text>
                </View>
              </View>
              <View style={styles.locationWrapper}>
                <Feather
                  name="map-pin"
                  size={20}
                  color="#BDBDBD"
                  style={styles.mapPin}
                />
                <Text style={styles.locationText}>Karpaty</Text>
              </View>
            </View>
          </View>

          <View style={styles.postWrapper}>
            <View style={styles.imageWrapper}>
              <Image source={postImage} style={styles.postImage} />
            </View>
            <Text style={styles.postTitle}>Forest</Text>
            <View style={styles.postDetails}>
              <View style={styles.reactionWrapper}>
                <View style={styles.commentsWrapper}>
                  <TouchableOpacity onPress={comment} activeOpacity={0.7}>
                    <Image source={messageCircle} style={styles.commentsIcon} />
                  </TouchableOpacity>
                  <Text style={styles.commentsNumber}>5</Text>
                </View>
                <View style={styles.likesWrapper}>
                  <TouchableOpacity onPress={logOut} activeOpacity={0.7}>
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
              <View style={styles.locationWrapper}>
                <Feather
                  name="map-pin"
                  size={20}
                  color="#BDBDBD"
                  style={styles.mapPin}
                />
                <Text style={styles.locationText}>Karpaty</Text>
              </View>
            </View>
          </View>
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
    justifyContent: "flex-start",
    paddingTop: 147,
    resizeMode: "cover",
  },
  contentWrapper: {
    position: "relative",
    minHeight: "100%",
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
  addAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translate: [20, -10] }],
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
    width: "100%",
    height: 240,
    marginBottom: "25%",
    backgroundColor: "#F6F6F6",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    resizeMode: "cover",
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
