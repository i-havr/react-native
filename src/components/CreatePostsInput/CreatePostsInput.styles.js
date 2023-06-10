import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
  },
  mapPin: {
    position: "absolute",
    left: 0,
    transform: [{ translate: [0, 16] }],
  },
});
