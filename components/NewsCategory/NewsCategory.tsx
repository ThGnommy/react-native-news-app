import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import { useAppDispatch } from "../../redux/types";
import { fetchTopNews } from "../../redux/newsSlice";

interface NewsCategoryProps {
  url: string;
  category: string;
}

export const NewsCategory = ({ url, category }: NewsCategoryProps) => {
  const dispatch = useAppDispatch();

  return (
    <TouchableWithoutFeedback onPress={() => dispatch(fetchTopNews())}>
      <Box style={styles.newsBox}>
        <ImageBackground
          source={{
            uri: url,
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
    borderRadius: 10,
  },
  image: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  newsBox: {
    height: 150,
    width: "auto",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
