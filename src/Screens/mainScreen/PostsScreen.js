import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import Avatar from "../../../assets/images/avatar.png";

export default function PostsScreen() {
  const logOut = () => {
    console.log("Click Log Out!");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.text}>Publications</Text>
        <TouchableOpacity onPress={logOut} activeOpacity={0.7}>
          <View style={styles.logoutIconWrapper}>
            <Feather name="log-out" size={24} style={styles.logoutIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.avatarWrapper}>
          <Image source={Avatar} style={styles.avatar} />
          <View style={styles.textWrapper}>
            <Text style={styles.textName}>Natali Romanova</Text>
            <Text style={styles.textEmail}>email@example.com</Text>
          </View>
        </View>
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
  },
  logoutIcon: {
    width: 24,
    height: 24,
    color: "#BDBDBD",
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
  },
  avatarWrapper: {
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
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
});
