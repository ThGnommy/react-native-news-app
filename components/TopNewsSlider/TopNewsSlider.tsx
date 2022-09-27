import { StyleSheet } from "react-native";
import React from "react";
import { HStack, ScrollView } from "native-base";
import { TopNewsSliderItem } from "../TopNewsSliderItem/TopNewsSliderItem";

export const TopNewsSlider = () => {
  return (
    <ScrollView
      style={styles.list}
      my={2}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <HStack space={4}>
        {Array(10)
          .fill(undefined)
          .map(() => (
            <TopNewsSliderItem />
          ))}
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
