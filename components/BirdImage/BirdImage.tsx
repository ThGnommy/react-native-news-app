import { StyleSheet } from "react-native";
import React from "react";
import { Image } from "native-base";

export const BirdImage = ({ source }: any) => {
  return <Image style={styles.bird} source={source} alt="bird" />;
};

const styles = StyleSheet.create({
  bird: {
    // position: "absolute",
    // bottom: 70,
    // alignSelf: "center",
    marginTop: 25,
    width: 150,
    height: 150,
  },
});
