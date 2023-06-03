import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
