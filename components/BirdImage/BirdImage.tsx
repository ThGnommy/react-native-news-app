import { StyleSheet } from "react-native";
import React from "react";
import { Image, useColorMode, View } from "native-base";

interface BirdProps {
  source: any;
  style: object;
  flex?: any;
  webStyles?: object;
}

export const BirdImage = ({ source, style, flex, webStyles }: BirdProps) => {
  const { colorMode } = useColorMode();

  return (
    <View
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
      style={{
        flex: flex,
        width: "100%",
      }}
    >
      <Image
        _web={{ style: webStyles }}
        style={style}
        source={source}
        alt="bird"
      />
    </View>
  );
};
