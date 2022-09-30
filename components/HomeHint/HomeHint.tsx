import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Actionsheet,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorMode,
  View,
} from "native-base";
import { BirdImage } from "../BirdImage/BirdImage";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const HomeHint = () => {
  const [hint, setHint] = useState(false);
  const { colorMode } = useColorMode();

  const checkIfFirstLogin = async () => {
    const user: any = auth.currentUser;
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().firstLogin === true) {
        showHint().then(async () => {
          await updateDoc(docRef, {
            firstLogin: false,
          });
        });
      } else if (docSnap.data().firstLogin === false) return;
    } else {
      console.log("No such document!");
    }
  };

  // if it's the first login of the user, show the hint
  const showHint = async () => {
    const user: any = auth.currentUser;
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().firstLogin === false) return;
      else if (docSnap.data().firstLogin === true) setHint(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkIfFirstLogin();
    }, 1000);
  }, []);

  return (
    <Actionsheet hideDragIndicator isOpen={hint}>
      <Actionsheet.Content
        bg={colorMode === "dark" ? "coolGray.800" : "white"}
        px={12}
        pt={5}
      >
        <Heading style={styles.heading} size="sm">
          Hey! Did you know?
        </Heading>
        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="space-evenly"
        >
          <BirdImage
            flex={1}
            style={styles.bird}
            source={require("../../assets/images/bird-2.png")}
          />
          <View style={{ flex: 3 }}>
            <Text ml={12} style={styles.textHint}>
              You can search news in different countries. Take a look in{" "}
              <Text fontWeight="bold">Settings</Text>
            </Text>
            <Flex alignItems="center" flexDirection="row">
              <Text ml={12} style={styles.textHint}>
                by pressing
              </Text>
              <Icon
                ml={1}
                as={MaterialIcons}
                name="settings"
                size="lg"
                _dark={{
                  color: "white",
                }}
                _light={{
                  color: "coolGray.800",
                }}
              />
            </Flex>
          </View>
        </Flex>
        <Button ml={6} onPress={() => setHint(false)} size="lg">
          Thanks, I get it!
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignSelf: "flex-start",
  },
  bird: {
    marginTop: 16,
    height: 100,
    width: 250,
    resizeMode: "contain",
    // transform: [{ scaleX: -1 }],
    transform: [{ scale: 1.8 }, { rotateY: "180deg" }],
  },
  textHint: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
  icon: {},
});
