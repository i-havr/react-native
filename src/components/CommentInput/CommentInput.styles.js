import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    bottom: 16,
    width: Dimensions.get("window").width - 32,
    height: 50,
    paddingLeft: 16,
    paddingRight: 56,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
  },
  input: {
    position: "relative",
    minWidth: "100%",
    height: 48,
    paddingVertical: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
  },
  iconWrapper: {
    position: "absolute",
    right: 0,
  },
  inputIcon: {
    width: 34,
    height: 34,
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ translate: [48, 7] }],
    borderRadius: 17,
    zIndex: 1,
  },
});
