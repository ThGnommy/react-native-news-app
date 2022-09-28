import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Box, Text } from "native-base";
interface NewsCategoryProps {
  urlImage: string;
  category: string;
  getNews: () => void;
}

export const NewsCategory = ({
  urlImage,
  category,
  getNews,
}: NewsCategoryProps) => {
  return (
    <TouchableWithoutFeedback onPress={getNews}>
      <Box style={styles.newsBox}>
        <ImageBackground
          source={{
            uri: urlImage,
          }}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.text}>{category}</Text>
        </ImageBackground>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    width: "auto",
    padding: 5,
  },
  image: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },
  newsBox: {
    height: 150,
    width: "auto",
    margin: 5,
    borderRadius: 10,
  },
});
