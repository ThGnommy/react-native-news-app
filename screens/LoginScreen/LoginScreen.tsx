import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  VStack,
  Center,
  Container,
  FormControl,
  Input,
  Box,
  Heading,
  Button,
  KeyboardAvoidingView,
  Text,
  HStack,
  View,
  StatusBar,
  useColorMode,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import DynamicAlert from "../../components/DynamicAlert";
import { BirdImage } from "../../components/BirdImage/BirdImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(null);

  const { colorMode } = useColorMode();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError(error.message);
      setAlert(true);
    }
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
  };

  useEffect(() => {
    clearStorage();
  }, []);

  const hideAlert = () => {
    setAlert(false);
  };

  return (
    <>
      <KeyboardAvoidingView
        bg={colorMode === "dark" ? "coolGray.800" : "white"}
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack>
          <Center width="100%" height="100%">
            <Container style={styles.container} centerContent>
              <Heading style={styles.heading}>Early Bird Times</Heading>
              <Heading>Login</Heading>

              <Box w="full" alignItems="flex-start">
                <FormControl isRequired>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    onChangeText={(text) => setEmail(text)}
                    value={email || ""}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    _dark={{ placeholderTextColor: "white" }}
                  />
                </FormControl>
              </Box>

              <Box w="full" alignItems="flex-start">
                <FormControl isRequired>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    onChangeText={(text) => setPassword(text)}
                    value={password || ""}
                    placeholder="Enter password"
                    passwordRules="required: minlength: 8;"
                    secureTextEntry={showPassword ? false : true}
                    keyboardType="default"
                    InputRightElement={
                      <Pressable
                        onPress={() => setShowPassword((show) => !show)}
                      >
                        {showPassword ? (
                          <Icon
                            as={Entypo}
                            style={{ marginRight: 10 }}
                            name="eye"
                            size={18}
                            _dark={{ color: "white" }}
                          />
                        ) : (
                          <Icon
                            as={Entypo}
                            style={{ marginRight: 10 }}
                            name="eye-with-line"
                            size={18}
                            _dark={{ color: "white" }}
                          />
                        )}
                      </Pressable>
                    }
                    _dark={{ placeholderTextColor: "white" }}
                  />
                </FormControl>
              </Box>
              <Button my={4} onPress={signIn}>
                Login
              </Button>
              <HStack style={styles.registerHere}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity activeOpacity={0.5}>
                  <Text
                    onPress={() => navigation.navigate("RegisterScreen")}
                    style={{
                      fontWeight: "bold",
                      marginLeft: 5,
                    }}
                  >
                    Register here
                  </Text>
                </TouchableOpacity>
              </HStack>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPasswordScreen")}
                activeOpacity={0.5}
              >
                <Text
                  style={{ fontWeight: "bold" }}
                  _light={{ color: "black" }}
                >
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </Container>
            {/* <BirdImage
              style={styles.bird}
              source={require("../../assets/images/bird-5.png")}
            /> */}
          </Center>
        </VStack>
        {alert && (
          <View style={styles.alert}>
            <DynamicAlert
              text={loginError || ""}
              status="error"
              onClose={hideAlert}
            />
          </View>
        )}
        <StatusBar
          barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
        />
      </KeyboardAvoidingView>
      <BirdImage
        flex={1.2}
        webStyles={styles.webBird}
        style={styles.bird}
        source={require("../../assets/images/bird-5.png")}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 2,
  },
  container: {
    width: "100%",
  },
  heading: {
    marginBottom: 50,
  },
  registerHere: {
    marginBottom: 10,
  },
  bird: {
    position: "relative",
    resizeMode: "contain",
    alignSelf: "center",
    height: 250,
    transform: [{ scale: 1.05 }],
  },
  webBird: {
    alignSelf: "stretch",
    position: "relative",
    resizeMode: "contain",
    height: 250,
    transform: [{ scale: 1.05 }],
  },
  alert: {
    position: "absolute",
    width: "100%",
    padding: 20,
    top: "10%",
  },
});
