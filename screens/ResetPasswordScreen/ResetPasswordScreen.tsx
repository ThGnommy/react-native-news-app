import { Platform, StyleSheet } from "react-native";
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

import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import DynamicAlert from "../../components/DynamicAlert";

export const ResetPasswordScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Forgot Password",
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const forgetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setAlert(true);
      // console.error(error);
    }
  };

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
            {alert && (
              <View>
                <DynamicAlert
                  style={styles.alert}
                  text="Email not found."
                  status="error"
                  onClose={hideAlert}
                />
              </View>
            )}

            <Heading>Reset password</Heading>
            <Box my={6} alignItems="flex-start">
              <FormControl.Label>Insert a valid Email</FormControl.Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                value={email || ""}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            </Box>
            <Button onPress={forgetPassword} mb={4}>
              Send Email
            </Button>
          </Container>
        </Center>
      </VStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {},
});
