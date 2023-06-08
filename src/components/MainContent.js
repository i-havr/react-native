import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { authChangeStatus } from "../redux/auth/authOperations";

import { useRoutes } from "../hooks";

export const MainContent = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const routing = useRoutes(stateChange);

  useEffect(() => {
    dispatch(authChangeStatus());
  }, [stateChange]);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
