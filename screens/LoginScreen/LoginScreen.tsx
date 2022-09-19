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
  Divider,
  View,
} from "native-base";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { auth } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigation.replace("HomeScreen");
      } else {
        console.log(user);
      }
    });
    return unsubscribe;
  }, []);

  const goToRegisterScreen = () => {
    navigation.navigate("RegisterScreen");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
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
            <Button onPress={signIn} style={styles.loginButton}>
              Login
            </Button>
            <HStack style={styles.registerHere}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={goToRegisterScreen}
              >
                <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                  Register here
                </Text>
              </TouchableOpacity>
            </HStack>
            <Text style={{ fontWeight: "bold" }} _light={{ color: "black" }}>
              Forgot Password
            </Text>
            <Divider width={300} my={6} orientation="horizontal" />
            <TouchableOpacity activeOpacity={0.5}>
              <View style={styles.google}>
                <AntDesign name="google" size={36} color="white" />
              </View>
            </TouchableOpacity>
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
