import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterSceen";
import { RootStackParamList } from "../App";

export const AuthStacks = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </>
  );
};
