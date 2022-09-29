import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../redux/types";
import { Flex, ScrollView, useColorMode } from "native-base";
import NewsItem from "../../components/NewsItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../../components/Loader";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const BookmarksScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [bookmarks, setBookmarks] = useState<object[]>([]);

  const { colorMode } = useColorMode();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Bookmarks",
    });
  }, []);

  const getBookmarks = async () => {
    const user: any = auth.currentUser;

    const userRef = doc(db, "users", user?.uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      setBookmarks(userData.data().bookmarks);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <>
      <ScrollView
        bg={colorMode === "dark" ? "coolGray.800" : "white"}
        contentContainerStyle={styles.screen}
      >
        <Flex flexDirection="row" flexWrap="wrap">
          {bookmarks.map((n: any) => (
            <NewsItem
              key={n.title}
              title={n.title}
              source={n.source.name}
              urlImage={
                n.urlImage ??
                "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              }
              description={n.description}
              content={n.content}
            />
          ))}
        </Flex>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    paddingBottom: 10,
  },
});
