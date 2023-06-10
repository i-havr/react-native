import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  commentWrapper: {
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#BDBDBD",
    overflow: "hidden",
  },
  commentAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    resizeMode: "cover",
  },
  commentMessageWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: Dimensions.get("window").width - 76,
    padding: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentMessage: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentCreatedAt: {
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
