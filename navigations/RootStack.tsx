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
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { Icon, useColorMode } from "native-base";
import NewsScreen from "../screens/NewsScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const RootStack = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  const { isSignedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { colorMode } = useColorMode();

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

  return (
    <>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: `${colorMode === "dark" ? "#1f2937" : "white"}`,
          },
          headerTintColor: `${colorMode === "dark" ? "white" : "#1f2937"}`,
        }}
      >
        {isSignedIn === false ? (
          <>
            <RootStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={() => ({ headerShown: false })}
            />
            <RootStack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={() => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={() => ({ headerBackTitle: "Login" })}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: "Home",
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("BookmarksScreen")}
                  >
                    <Icon
                      as={MaterialIcons}
                      name="bookmarks"
                      size="lg"
                      _dark={{
                        color: "white",
                      }}
                      _light={{
                        color: "coolGray.800",
                      }}
                    />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SettingsScreen")}
                  >
                    <Icon
                      as={MaterialIcons}
                      name="settings"
                      size="lg"
                      _dark={{
                        color: "white",
                      }}
                      _light={{
                        color: "coolGray.800",
                      }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <RootStack.Screen
              name="BookmarksScreen"
              component={BookmarksScreen}
              options={() => ({
                title: "Your Bookmarks",
              })}
            />
            <RootStack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
            />
            <RootStack.Screen name="NewsScreen" component={NewsScreen} />
          </>
        )}
      </RootStack.Navigator>
    </>
  );
};
