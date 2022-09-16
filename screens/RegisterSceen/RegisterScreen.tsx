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
  VStack,
} from "native-base";
import { Entypo, AntDesign } from "@expo/vector-icons";

import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const RegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const goToLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  const registerWithEmail = async () => {
    if (email === "" || password === "") return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);
    } catch (error) {
      alert(error);
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
});
