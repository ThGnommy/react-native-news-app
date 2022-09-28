import { ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "native-base";

interface TopNewsProps {
  title: string;
  urlImage: string;
  source: string;
}

export const TopNewsSliderItem = ({
  title,
  urlImage,
  source,
}: TopNewsProps) => {
  return (
    <Box width={300} height={250} style={styles.slide}>
      <ImageBackground
        source={{
          uri: urlImage,
        }}
        resizeMode="cover"
        style={styles.image}
      >
        {source && (
          <Text fontWeight="bold" style={styles.category}>
            {source}
          </Text>
        )}
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
          {title}
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
    color: "white",
  },
});
