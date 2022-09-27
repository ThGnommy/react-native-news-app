import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useAppSelector } from "../../redux/types";
import { Flex, Heading, Icon, ScrollView, useColorMode } from "native-base";
import NewsItem from "../../components/NewsItem";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";

export const NewsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route: any = useRoute();

  const { news } = useAppSelector((state) => state.news);
  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.categoryName || ""} News`,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Icon
            as={MaterialIcons}
            name="settings"
            size="lg"
            _dark={{
              color: "white",
            }}
            _light={{
              color: "coolGray.800",
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    paddingBottom: 10,
  },
});
