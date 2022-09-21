import { NativeBaseProvider, Text, View } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterSceen";
import HomeScreen from "./screens/HomeScreen";
import { SettingsScreen } from "./screens/SettingsScreen/SettingsScreen";
import { createContext } from "react";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  const user = null;

  // const AuthContext = createContext()

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
              <RootStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
              />
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
