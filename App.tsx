import { extendTheme, NativeBaseProvider, useColorMode } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RootStack } from "./navigations/RootStack";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

export default function App() {
  const { colorMode } = useColorMode();

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
