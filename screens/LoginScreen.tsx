import { Platform, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
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
  DeleteIcon,
  Text,
  HStack,
  Divider,
} from "native-base";
import { Entypo } from "@expo/vector-icons";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(email);
  }, [setEmail]);

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
            <Button style={styles.loginButton}>Login</Button>
            <HStack style={styles.registerHere}>
              <Text>Don't have an account?</Text>
              <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                Register here
              </Text>
            </HStack>

            <Text style={{ fontWeight: "bold" }} _light={{ color: "black" }}>
              Forgot Password
            </Text>
            <Divider
              thickness={10}
              _light={{
                bg: "black",
              }}
              _dark={{
                bg: "black",
              }}
            />
          </Container>
        </Center>
      </VStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 50,
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
});
