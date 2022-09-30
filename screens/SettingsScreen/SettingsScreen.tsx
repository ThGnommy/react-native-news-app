import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  Box,
  Text,
  HStack,
  Switch,
  Divider,
  Select,
  Center,
  Button,
  useColorMode,
  StatusBar,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { resetNews, setLanguage } from "../../redux/newsSlice";
import { BirdImage } from "../../components/BirdImage/BirdImage";

export const SettingsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { colorMode, toggleColorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Settings",
    });
  }, []);

  const { user } = useAppSelector((state: any) => state.user);
  const { country } = useAppSelector((state) => state.news);

  const dispatch = useAppDispatch();

  // console.log(
  //   "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza"
  // );

  const countries = {
    ar: "Arabic",
    de: "German",
    us: "United States",
    es: "Spanish",
    fr: "French",
    he: "Hebrew",
    it: "Italian",
    nl: "Dutch",
    no: "Norwegian",
    pt: "Portuguese",
    ru: "Russian",
    sv: "Swedish",
    zh: "Chinese",
  };

  const updateLanguage = (value: string) => {
    dispatch(setLanguage(value));
    dispatch(resetNews());
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      style={styles.screen}
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
    >
      <HStack mt={6} style={styles.section}>
        <Text bold fontSize="md">
          Your Email:
        </Text>
        <Text noOfLines={1} isTruncated fontSize="md">
          {user.email}
        </Text>
      </HStack>
      <Divider my={3} />
      <HStack style={styles.section}>
        <Text bold fontSize="md">
          Dark Mode
        </Text>
        <Switch
          isChecked={colorMode === "dark"}
          onToggle={toggleColorMode}
          size="md"
        />
      </HStack>
      <Divider my={3} />
      <HStack style={styles.section}>
        <Text bold fontSize="md">
          Choose your country
        </Text>
        <Select
          width={150}
          defaultValue={
            Object.keys(countries)[Object.keys(countries).indexOf(country)]
          }
          accessibilityLabel="Choose a language"
          placeholder="Language"
          onValueChange={(value) => updateLanguage(value)}
        >
          {Object.entries(countries).map((lang) => (
            <Select.Item key={lang[0]} label={lang[1]} value={lang[0]} />
          ))}
        </Select>
      </HStack>
      <Center mt={12}>
        <Button
          onPress={logout}
          startIcon={<MaterialIcons name="logout" size={24} color="white" />}
          size="md"
        >
          <Text bold color="white" fontSize="lg">
            Logout
          </Text>
        </Button>
      </Center>
      <BirdImage
        flex={1.2}
        style={styles.bird}
        source={require("../../assets/images/bird-6.png")}
      />
      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  section: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  bird: {
    marginTop: 25,
    alignSelf: "center",
    resizeMode: "contain",
    transform: [{ scale: 0.8 }],
    height: 250,
  },
});
