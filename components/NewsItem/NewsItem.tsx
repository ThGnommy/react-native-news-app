import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Text } from "native-base";
import { useAppSelector } from "../../redux/types";
import { auth, db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const { bookmarksScreen } = useAppSelector((state) => state.news);

  const news = {
    title,
    urlImage,
    source,
    description,
  };

  const updateBookmarks = async () => {
    const user: any = auth.currentUser;

    const userRef = doc(db, "users", user?.uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      const saved = userData
        .data()
        .bookmarks.findIndex((x: any) => x.title === news.title);

      console.log(news);

      if (saved === -1) {
        await updateDoc(userRef, {
          bookmarks: arrayUnion(news),
        });
        setBookmarked(true);
      } else {
        await updateDoc(userRef, {
          bookmarks: arrayRemove(news),
        });
        setBookmarked(false);
      }
    } else {
      console.log("No such document!");
    }
  };

  const removeBookmark = async () => {
    const user: any = auth.currentUser;

    const userRef = doc(db, "users", user?.uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      const index = userData
        .data()
        .bookmarks.findIndex((x: any) => x.title === news.title);
      console.log(
        userData.data().bookmarks.filter((n: any, idx: any) => idx !== index)
      );

      const newArr = userData
        .data()
        .bookmarks.filter((_: any, idx: any) => idx !== index);

      await updateDoc(userRef, {
        // bookmarks: arrayRemove(news),
        bookmarks: newArr,
      });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    (async () => {
      const user: any = auth.currentUser;

      const userRef = doc(db, "users", user?.uid);
      const userData = await getDoc(userRef);

      if (userData.exists()) {
        const saved = userData
          .data()
          .bookmarks.findIndex((x: any) => x.title === news.title);

        if (saved !== -1) setBookmarked(true);
        else setBookmarked(false);
      } else {
        console.log("No such document!");
      }
    })();
  }, []);

  const handleBookmarks = () =>
    bookmarksScreen === true ? removeBookmark() : updateBookmarks();

  return (
    <TouchableWithoutFeedback>
      <Box style={styles.newsBox} width="100%">
        <ImageBackground
          source={{
            uri: urlImage,
          }}
          resizeMode="cover"
          style={styles.image}
        >
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text style={styles.source}>{source}</Text>
            <TouchableOpacity onPress={handleBookmarks}>
              <Icon
                as={MaterialIcons}
                name={!bookmarked ? "bookmark-border" : "bookmark"}
                size="xl"
                color="amber.300"
              />
            </TouchableOpacity>
          </Flex>
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
