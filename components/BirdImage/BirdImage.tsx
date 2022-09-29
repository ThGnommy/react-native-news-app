import { StyleSheet } from "react-native";
import React from "react";
import { Image } from "native-base";

interface BirdProps {
  source: any;
  style: object;
}

export const BirdImage = ({ source, style }: BirdProps) => {
  return <Image style={style} source={source} alt="bird" />;
};
