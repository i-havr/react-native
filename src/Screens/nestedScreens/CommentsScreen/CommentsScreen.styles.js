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
  arrowWrapper: {
    position: "absolute",
    left: 16,
    bottom: "50%",
    transform: [{ translate: [0, 3] }],
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    width: "100%",
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
    backgroundColor: "#BDBDBD",
    overflow: "hidden",
  },
  postImage: {
    flex: 1,
  },
});
