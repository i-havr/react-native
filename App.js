import "react-native-gesture-handler";
import React from "react";
import { Text } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";

import { useFonts } from "expo-font";

import { MainContent } from "./src/components/MainContent";
import { store, persistor } from "./src/redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <MainContent />
      </PersistGate>
      <FlashMessage position="bottom" duration={5000} />
    </Provider>
  );
}
