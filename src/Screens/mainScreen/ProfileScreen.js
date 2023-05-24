import { View, Text, StyleSheet, Image } from "react-native";

import LogoutIcon from "../../../assets/icons/logout-icon.png";
import Avatar from "../../../assets/images/avatar.png";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.text}>PROFILE SCREEN</Text>
        <Image source={LogoutIcon} style={styles.logoutIcon} />
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
  logoutIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translate: [0, 0] }],
    width: 24,
    height: 24,
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
