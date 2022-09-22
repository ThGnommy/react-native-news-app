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
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import DynamicAlert from "../../components/DynamicAlert";

type EmailErrorProps = {
  error: string | null;
};

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError(error.message);
      setAlert(true);
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const hideAlert = () => {
    setAlert(false);
  };

  return (
    <KeyboardAvoidingView
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
                  keyboardType="visible-password"
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword((show) => !show)}>
                      {showPassword ? (
                        <Entypo
                          style={{ marginRight: 10 }}
                          name="eye"
                          size={18}
                          color="black"
                        />
                      ) : (
                        <Entypo
                          style={{ marginRight: 10 }}
                          name="eye-with-line"
                          size={18}
                          color="black"
                        />
                      )}
                    </Pressable>
                  }
                />
              </FormControl>
            </Box>
            <Button onPress={signIn} style={styles.loginButton}>
              Login
            </Button>
            <HStack style={styles.registerHere}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Text
                  onPress={() => navigation.navigate("RegisterScreen")}
                  style={{ fontWeight: "bold", marginLeft: 5 }}
                >
                  Register here
                </Text>
              </TouchableOpacity>
            </HStack>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPasswordScreen")}
              activeOpacity={0.5}
            >
              <Text style={{ fontWeight: "bold" }} _light={{ color: "black" }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </Container>
        </Center>
        {alert && (
          <View>
            <DynamicAlert
              text={loginError || ""}
              status="error"
              onClose={hideAlert}
            />
          </View>
        )}
      </VStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
  },
  heading: {
    marginBottom: 50,
  },
  loginButton: {
    marginTop: 10,
  },
  registerHere: {
    marginVertical: 10,
  },
});
