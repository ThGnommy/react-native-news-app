import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Button, Center } from "native-base";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Entypo, AntDesign } from "@expo/vector-icons";

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.replace("LoginScreen");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Center style={styles.screen}>
      <Text>HomeScreen</Text>
      <Button onPress={logout}>Logout</Button>
    </Center>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
