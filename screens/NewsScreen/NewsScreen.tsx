import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { Flex, ScrollView, Text, useColorMode, View } from "native-base";
import NewsItem from "../../components/NewsItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../../components/Loader";
import { BirdImage } from "../../components/BirdImage/BirdImage";
import { setQuerySearch } from "../../redux/newsSlice";

export const NewsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { news, loadingNews, categoryName, querySearch, word } = useAppSelector(
    (state) => state.news
  );
  const dispatch = useAppDispatch();

  const { colorMode } = useColorMode();

  const searchWord = () => {
    const fl = word.at(0).toUpperCase();
    const next = word.slice(1, word.length);
    return fl.concat(next);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        querySearch === false
          ? `${categoryName || ""} News`
          : `Search for "${searchWord()}"`,
    });
  }, []);

  return (
    <>
      {!loadingNews ? (
        <ScrollView
          bg={colorMode === "dark" ? "coolGray.800" : "white"}
          contentContainerStyle={styles.screen}
        >
          <Flex flexDirection="row" flexWrap="wrap">
            {news ? (
              news.map((n: any) => (
                <NewsItem
                  key={n.title}
                  title={n.title}
                  source={n.source.name}
                  urlImage={
                    n.urlToImage ??
                    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  }
                  description={n.description}
                  content={n.content}
                  link={n.url}
                />
              ))
            ) : (
              <Flex justifyContent="center" alignItems="center" width="100%">
                <BirdImage
                  flex={1}
                  style={styles.bird}
                  source={require("../../assets/images/bird-1.png")}
                />
                <Text fontSize={20}>No news found.</Text>
              </Flex>
            )}
          </Flex>
        </ScrollView>
      ) : (
        <Loader />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 10,
  },
  bird: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
    transform: [{ scale: 0.5 }],
  },
});
