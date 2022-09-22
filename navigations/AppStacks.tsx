import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "../screens/SettingsScreen/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../App";

export const AppStacks = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <RootStack.Group>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </RootStack.Group>
  );
};
