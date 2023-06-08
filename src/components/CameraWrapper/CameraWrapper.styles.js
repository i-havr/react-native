import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cameraWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "100%",
    height: 240,
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: {
    position: "absolute",
    top: 0,
    flex: 1,
    width: "100%",
    height: "154%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  iconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    zIndex: 2,
  },
  previewImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
