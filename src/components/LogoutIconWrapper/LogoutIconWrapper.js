import React from "react";
import { View, TouchableOpacity } from "react-native";

import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";

import { Feather } from "@expo/vector-icons";
import { styles } from "./LogoutIconWrapper.styles";

export const LogoutIconWrapper = () => {
  const dispatch = useDispatch();

  const userSignOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.logoutIconWrapper}>
      <TouchableOpacity onPress={userSignOut} activeOpacity={0.7}>
        <Feather name="log-out" size={22} style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  );
};
