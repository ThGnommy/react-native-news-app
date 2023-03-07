import { Platform, StyleSheet } from "react-native";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  useColorMode,
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
import { BirdImage } from "../../components/BirdImage/BirdImage";

export const ResetPasswordScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const [resetError, setResetError] = useState(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const forgetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setAlert(true);
      setResetError(error.message);
    }
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
              <Heading>Reset password</Heading>
              <Box w="full" my={4} alignItems="flex-start">
                <FormControl isRequired>
                  <FormControl.Label>Insert your email</FormControl.Label>
                  <Input
                    onChangeText={(text) => setEmail(text)}
                    value={email || ""}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    _dark={{ placeholderTextColor: "white" }}
                  />
                </FormControl>
              </Box>
              <Button onPress={forgetPassword} mb={4}>
                Send Email
              </Button>
            </Container>
          </Center>
          {alert && (
            <View style={styles.alert}>
              <DynamicAlert
                text={resetError || "Something goes wrong."}
                status="error"
                onClose={() => setAlert(false)}
              />
            </View>
          )}
        </VStack>
      </KeyboardAvoidingView>
      <BirdImage
        flex={1.2}
        style={styles.bird}
        webStyles={styles.webBird}
        source={require("../../assets/images/bird-3.png")}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  alert: {
    position: "absolute",
    top: "10%",
    width: "100%",
    padding: 20,
  },
  bird: {
    resizeMode: "contain",
    alignSelf: "center",
    height: 200,
  },
  webBird: {
    alignSelf: "stretch",
    position: "relative",
    resizeMode: "contain",
    height: 250,
    transform: [{ scale: 1.05 }],
  },
});
