import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
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
  View,
  VStack,
} from "native-base";
import { Entypo, AntDesign } from "@expo/vector-icons";

import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { z, ZodError, ZodIssue } from "zod";
import DynamicAlert from "../../components/DynamicAlert";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [alert, setAlert] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
      headerTintColor: "#000000",
    });
  }, [navigation]);

  const goToLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  const validateUserCredential = (email: string, password: string) => {
    const User = z.object({
      email: z.string().email({ message: "Insert a valid Email." }).trim(),
      password: z
        .string()
        .min(8, { message: "Password must be minimum 8 characters." })
        .trim(),
    });

    return User.safeParse({ email, password });
  };

  const registerWithEmail = () => {
    const User = validateUserCredential(email, password);

    if (!User.success) {
      console.log("errore:", User.error);

      const errorArray: string[] = [];

      User.error.errors.forEach((error: ZodIssue) => {
        errorArray.push("Error: ", error.message);
      });
      setRegisterError(errorArray.join("\n") as any);
      setAlert(true);
    } else if (User.success) {
      try {
        validateUserCredential(email, password);
      } catch (error) {
        setRegisterError(error as any);
        setAlert(true);
      }
    }
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
            <Heading>Register</Heading>
            <Box alignItems="flex-start">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                value={email || ""}
                placeholder="Enter email"
                keyboardType="email-address"
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
    backgroundColor: "#fff",
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
  google: {
    borderRadius: 100,
    backgroundColor: "#000",
    padding: 15,
  },
  alert: {
    position: "absolute",
    width: "100%",
    padding: 20,
    top: "10%",
  },
});
