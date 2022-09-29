import { extendTheme, NativeBaseProvider, useColorMode } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RootStack } from "./navigations/RootStack";
import { theme } from "./theme";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
  NewsScreen: undefined | { categoryName?: string };
};

export default function App() {
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
