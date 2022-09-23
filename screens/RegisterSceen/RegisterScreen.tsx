import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  useColorMode,
  View,
  Text,
  VStack,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";

import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ZodIssue } from "zod";
import DynamicAlert from "../../components/DynamicAlert";
import { validateUserCredential } from "../../utils";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [alert, setAlert] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const goToLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  const registerWithEmail = async () => {
    const User = validateUserCredential(email, password);

    if (!User.success) {
      const errorArray: string[] = [];

      User.error.errors.forEach((error: ZodIssue) => {
        errorArray.push("Error: " + error.message);
      });
      setRegisterError(errorArray.join("\n"));
      setAlert(true);
    } else if (User.success) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setRegisterError(error as string);
        setAlert(true);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VStack>
        <Center width="100%" height="100%">
          <Container style={styles.container} centerContent>
            <Heading style={styles.heading}>Early Bird Times</Heading>
            <Heading>Register</Heading>
            <Box alignItems="flex-start">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                value={email || ""}
                placeholder="Enter email"
                keyboardType="email-address"
                _dark={{ placeholderTextColor: "white" }}
              />
            </Box>
            <Box alignItems="flex-start">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                mb={4}
                onChangeText={(text) => setPassword(text)}
                value={password || ""}
                placeholder="Enter password"
                passwordRules="required: minlength: 8;"
                secureTextEntry={showPassword ? false : true}
                keyboardType="visible-password"
                InputRightElement={
                  <Pressable onPress={() => setShowPassword((show) => !show)}>
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
            </Box>
            <Button
              onPress={registerWithEmail}
              mb={4}
              style={styles.loginButton}
            >
              Create an account
            </Button>
            <HStack style={styles.registerHere}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={goToLoginScreen} activeOpacity={0.5}>
                <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Login here
                </Text>
              </TouchableOpacity>
            </HStack>
          </Container>
        </Center>
      </VStack>
      {alert && (
        <View style={styles.alert}>
          <DynamicAlert
            text={registerError || ""}
            status="error"
            onClose={() => setAlert(false)}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {},
  heading: {
    marginBottom: 50,
  },
  loginButton: {
    marginTop: 10,
  },
  registerHere: {
    marginVertical: 10,
  },
  alert: {
    position: "absolute",
    width: "100%",
    padding: 20,
    top: "10%",
  },
});
