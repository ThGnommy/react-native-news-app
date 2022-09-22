import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signin, signout } from "../redux/userSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterSceen";
import HomeScreen from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen/SettingsScreen";

export const RootStack = () => {
  const { isSignedIn } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(signin(user));
      } else {
        dispatch(signout());
      }
    });
    return unsubscribe;
  }, []);

  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <RootStack.Navigator>
        {isSignedIn === false ? (
          <>
            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
            <RootStack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
            />
          </>
        ) : (
          <>
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </>
  );
};
