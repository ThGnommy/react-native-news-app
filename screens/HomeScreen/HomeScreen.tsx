import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import {
  Center,
  useColorMode,
  Icon,
  StatusBar,
  Box,
  Input,
  HStack,
  VStack,
  ScrollView,
  Heading,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { MaterialIcons } from "@expo/vector-icons";
import NewsCategory from "../../components/NewsCategory";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { fetchTopNews, setCategory } from "../../redux/newsSlice";
import TopNewsSlider from "../../components/TopNewsSlider";

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { colorMode } = useColorMode();

  const dispatch = useAppDispatch();

  const { country, categoryName } = useAppSelector((state) => state.news);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerLeft: () => (
        <TouchableOpacity
        // onPress={() => navigation.navigate("BookmarksScreen")}
        >
          <Icon
            as={MaterialIcons}
            name="bookmarks"
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

  const categories = [
    // {
    //   image:
    //     "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    //   text: "Top Headlines",
    // },
    {
      image:
        "https://images.unsplash.com/photo-1558017487-06bf9f82613a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80",
      text: "Health",
    },
    {
      image:
        "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1544&q=80",
      text: "Entertainment",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618053448492-2b629c2c912c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
      text: "Science",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      text: "Technology",
    },
    {
      image:
        "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      text: "Sports",
    },
    {
      image:
        "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      text: "Business",
    },
  ];

  const goToNewsList = (category: string) => {
    dispatch(setCategory(category));
    navigation.navigate("NewsScreen", { categoryName: categoryName });
  };

  useEffect(() => {
    dispatch(fetchTopNews({ country, categoryName }));
  }, [categoryName]);

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
      style={styles.screen}
    >
      <ScrollView showsVerticalScrollIndicator={false} width="100%">
        <Center mt={4}>
          <HStack width="full" space={2}>
            <Input
              flexGrow="1"
              placeholder="Search..."
              InputRightElement={
                <Pressable>
                  <Icon as={MaterialIcons} name="search" size="lg" mr={2} />
                </Pressable>
              }
            />
          </HStack>
        </Center>
        <VStack width="100%">
          <Heading my={2}>Top News</Heading>
          {/*      Slider here      */}
          <TopNewsSlider />
          <Heading my={2}>Categories</Heading>
          {categories.slice(1, categories.length).map<any>((item: any) => (
            <Box key={item.text}>
              <NewsCategory
                urlImage={item.image}
                category={item.text}
                getNews={() => goToNewsList(item.text)}
              />
            </Box>
          ))}
        </VStack>
      </ScrollView>

      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
});
