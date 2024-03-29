import { StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../redux/types";
import { Center, Flex, ScrollView, Text, useColorMode } from "native-base";
import NewsItem from "../../components/NewsItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { inBookmarksScreen } from "../../redux/newsSlice";
import { BirdImage } from "../../components/BirdImage/BirdImage";

export const BookmarksScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const [bookmarks, setBookmarks] = useState<object[]>([]);

  const { colorMode } = useColorMode();

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
    const user: any = auth.currentUser;

    const userRef = doc(db, "users", user?.uid);

    const unsub = onSnapshot(userRef, (doc) => {
      getBookmarks();
    });

    return unsub;
  }, []);

  useEffect(() => {
    // getBookmarks();
    dispatch(inBookmarksScreen(true));
    return () => {
      dispatch(inBookmarksScreen(false));
    };
  }, []);

  return (
    <>
      {bookmarks.length > 0 ? (
        <ScrollView
          bg={colorMode === "dark" ? "coolGray.800" : "white"}
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}
        >
          <Flex flexDirection="row" flexWrap="wrap">
            {bookmarks &&
              bookmarks.map((n: any) => (
                <NewsItem
                  key={n.title}
                  title={n.title}
                  source={n.source}
                  urlImage={
                    n.urlImage ??
                    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  }
                  description={n.description}
                  content={n.content}
                  link={n.link}
                />
              ))}
          </Flex>
        </ScrollView>
      ) : (
        <Center
          style={styles.noBookmarks}
          bg={colorMode === "dark" ? "coolGray.800" : "white"}
        >
          <Flex justifyContent="center" alignItems="center" width="100%">
            <BirdImage
              flex={0}
              style={styles.bird}
              webStyles={styles.webBird}
              source={require("../../assets/images/bird-1.png")}
            />
            <Text fontSize={20}>There are no bookmarks here, sorry.</Text>
          </Flex>
        </Center>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    paddingBottom: 10,
  },
  noBookmarks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bird: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
    transform: [{ scale: 0.5 }],
  },
  webBird: {
    alignSelf: "stretch",
    position: "relative",
    resizeMode: "contain",
    height: 250,
    transform: [{ scale: 0.8 }],
  },
});
