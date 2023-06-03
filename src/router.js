import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreen/Home";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />

        {/* <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        /> */}
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator initialRouteName="Home">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
};
