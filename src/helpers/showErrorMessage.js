import { showMessage } from "react-native-flash-message";

export const showErrorMessage = (message) => {
  if (message.includes("Firebase:")) {
    if (message.includes("auth/")) {
      const startIndex = message.indexOf("/");
      const endIndex = message.indexOf(")");
      const errorText = message.substring(startIndex + 1, endIndex);
      const normalizedErrorText = (
        errorText.charAt(0).toUpperCase() + errorText.slice(1)
      ).replace("-", " ");

      showMessage({
        message: `Whoops! ${normalizedErrorText}!`,
        type: "warning",
      });
    } else {
      const startIndex = message.indexOf(":");
      const endIndex = message.indexOf("(");

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const text = message.substring(startIndex + 1, endIndex).trim();

        showMessage({
          message: `Whoops! ${text}!`,
          type: "warning",
        });
      }
    }
  } else {
    showMessage({
      message: `Whoops! ${message}!`,
      type: "warning",
    });
  }
};
