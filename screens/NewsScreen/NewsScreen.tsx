import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useAppSelector } from "../../redux/types";
import { Flex, ScrollView, useColorMode } from "native-base";
import NewsItem from "../../components/NewsItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../../components/Loader";

export const NewsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { news, loadingNews, categoryName } = useAppSelector(
    (state) => state.news
  );
  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${categoryName || ""} News`,
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
            {news.slice(0, 5).map((n: any) => (
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
              />
            ))}
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
    // flex: 1,
    paddingBottom: 10,
  },
});
