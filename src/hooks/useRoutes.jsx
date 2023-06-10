import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../screens/auth/LoginScreen/LoginScreen";
import Home from "../screens/mainScreen/Home";

const AuthStack = createStackNavigator();

export const useRoutes = (isAuth) => {
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
