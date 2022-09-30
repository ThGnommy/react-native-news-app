import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  ScrollView,
  Text,
  useColorMode,
  View,
} from "native-base";
import { TopNewsSliderItem } from "../TopNewsSliderItem/TopNewsSliderItem";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { fetchTopHeadlines } from "../../redux/newsSlice";
import { Loader } from "../Loader";

export const TopNewsSlider = () => {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();

  const { country, headlinesNews } = useAppSelector((state) => state.news);

  useEffect(() => {
    headlinesNews.length > 0 ? null : dispatch(fetchTopHeadlines(country));
  }, [country]);

  return (
    <ScrollView
      style={styles.list}
      my={2}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <HStack space={4}>
        {headlinesNews ? (
          headlinesNews
            .slice(10)
            .map((n: any, index) => (
              <TopNewsSliderItem
                key={index}
                title={n.title}
                urlImage={
                  n.urlToImage ??
                  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                }
                description={n.description}
                source={n.source.name}
                link={n.url}
              />
            ))
        ) : (
          <Loader />
        )}
      </HStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
