import { NativeBaseProvider, Text, View } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterSceen";
import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
};

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  const [user, setUser] = useState(false);

  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        console.log(user);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          {!user ? (
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
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

// // Define the config
// const config = {
//   useSystemColorMode: false,
//   initialColorMode: "light",
// };

// // extend the theme
// export const theme = extendTheme({ config });
// type MyThemeType = typeof theme;
// declare module "native-base" {
//   interface ICustomTheme extends MyThemeType {}
// }

// Color Switch Component
// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === "light"}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }
