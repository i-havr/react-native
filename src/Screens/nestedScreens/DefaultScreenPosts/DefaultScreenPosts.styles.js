import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
