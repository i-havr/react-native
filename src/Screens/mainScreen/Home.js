import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";

import { Feather } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function Home() {
  return (
    <Tabs.Navigator
      id="home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: "flex" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "Create") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return (
            <Feather
              style={{
                width: 70,
                height: 40,
                textAlign: "center",
                textAlignVertical: "center",
                backgroundColor: focused && "#FF6C00",
                borderRadius: focused ? 20 : 0,
                opacity: focused ? 1 : 0.8,
              }}
              name={iconName}
              size={24}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
