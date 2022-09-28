import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

interface NewsItemProps {
  title: string;
  source: string;
  description?: string;
  url?: string;
  urlImage: string;
  new?: boolean;
  content: string;
}

export const NewsItem = ({
  title,
  source,
  description,
  urlImage,
}: NewsItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Box style={styles.newsBox} width="100%">
        <ImageBackground
          source={{
            uri: urlImage,
          }}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.source}>{source}</Text>
        </ImageBackground>
        <Text fontStyle="italic" color="secondary.900" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  newsBox: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  image: {
    justifyContent: "flex-end",
    padding: 5,
    // marginVertical: 15,
    height: 200,
    borderRadius: 5,
    overflow: "hidden",
  },
  source: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  description: {},
});
