import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Box, Text } from "native-base";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { fetchTopNews, setCategory } from "../../redux/newsSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const { country, categoryName } = useAppSelector((state) => state.news);

  // const goToNewsList = () => {
  //   dispatch(setCategory(category));
  //   navigation.navigate("NewsScreen", { categoryName: category });
  // };

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
