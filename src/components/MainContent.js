import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { authChangeStatus } from "../redux/auth/authOperations";

import { useRoute } from "../router";

export const MainContent = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const routing = useRoute(stateChange);

  useEffect(() => {
    console.log("оновлюємо.........");
    dispatch(authChangeStatus());
  }, [stateChange]);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
