import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    transform: [{ scale: 1.01 }],
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
});
