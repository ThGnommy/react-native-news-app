import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { Text, Center, useColorMode, Icon, StatusBar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AntDesign } from "@expo/vector-icons";

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Icon
            as={AntDesign}
            name="setting"
            size="lg"
            _dark={{
              color: "white",
            }}
            _light={{
              color: "black",
            }}
          />
        </TouchableOpacity>
      ),
    });

    return () => {};
  }, []);

  return (
    <Center
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
      style={styles.screen}
    >
      <Text>HomeScreen</Text>
      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
