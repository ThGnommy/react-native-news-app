import { ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "native-base";

export const TopNewsSliderItem = () => {
  return (
    <Box width={300} height={250} style={styles.slide}>
      <ImageBackground
        source={{
          uri: `https://picsum.photos/200/300?random=${Math.floor(
            Math.random() * 100
          )}`,
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text fontWeight="bold" style={styles.category}>
          Category
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacus
          erat, hendrerit eu tellus nec, tempor ultricies metus. Nulla vitae
          lectus eu sapien vestibulum dictum. Integer vel accumsan sem.
        </Text>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    width: "auto",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  category: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "auto",
    padding: 5,
    alignSelf: "flex-end",
    color: "green",
  },
});
