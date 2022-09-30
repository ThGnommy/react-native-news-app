import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Center,
  useColorMode,
  Icon,
  StatusBar,
  Box,
  Input,
  VStack,
  ScrollView,
  Heading,
  Flex,
  useToast,
  Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { MaterialIcons } from "@expo/vector-icons";
import NewsCategory from "../../components/NewsCategory";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import {
  fetchNewsWithQuery,
  fetchTopNews,
  setCategory,
  setQuerySearch,
  setSearchWord,
} from "../../redux/newsSlice";
import TopNewsSlider from "../../components/TopNewsSlider";
import HomeHint from "../../components/HomeHint";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [query, setQuery] = useState<string>("");

  const { colorMode } = useColorMode();
  const toast = useToast();

  const dispatch = useAppDispatch();

  const { country, categoryName } = useAppSelector((state) => state.news);

  const createUserCollection = async () => {
    const user: any = auth.currentUser;
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "users", user?.uid), {
          firstLogin: true,
          bookmarks: [],
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    createUserCollection();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("BookmarksScreen")}
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
    navigation.navigate("NewsScreen");
  };

  const searchNewsByQuery = () => {
    // if no news are found, show toast
    if (query.trim() !== "") {
      dispatch(fetchNewsWithQuery({ country, query })).then((data: any) => {
        if (data.payload.length > 0) {
          dispatch(setQuerySearch(true));
          dispatch(setSearchWord(query));
          navigation.navigate("NewsScreen");
        } else if (data.payload.length === 0) {
          toast.show({
            render: () => {
              return (
                <Box bg="muted.200" px={6} py={2} rounded="md">
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    pt={2}
                  >
                    <Icon
                      as={MaterialIcons}
                      name="info-outline"
                      size="lg"
                      color="black"
                      mr={2}
                    />
                    <Text
                      _dark={{ color: "white" }}
                      _light={{ color: "black" }}
                      fontSize={16}
                      fontWeight="bold"
                    >
                      Oops!
                    </Text>
                  </Flex>
                  <Text alignSelf="center" p={2}>
                    No news found.
                  </Text>
                </Box>
              );
            },
          });
        }
      });
      setQuery("");
    }
  };

  useEffect(() => {
    // avoid fetching on first render
    if (categoryName === "") return;
    dispatch(fetchTopNews({ country, categoryName }));
  }, [categoryName, country]);

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
      style={styles.screen}
    >
      <ScrollView showsVerticalScrollIndicator={false} width="100%">
        <Center mt={4}>
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            w="90%"
          >
            <Input
              flexGrow="1"
              placeholder="Search..."
              onChangeText={(text) => setQuery(text)}
              value={query}
            />
            <TouchableOpacity onPress={searchNewsByQuery} activeOpacity={0.5}>
              <Icon as={MaterialIcons} name="search" size="lg" ml={2} />
            </TouchableOpacity>
          </Flex>
        </Center>
        <VStack width="100%">
          <Heading my={2}>Top News</Heading>
          {/*      Slider here      */}
          {/* <TopNewsSlider /> */}
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
      <HomeHint />
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
  alert: {
    position: "absolute",
    width: "100%",
    padding: 20,
    top: 30,
  },
});
