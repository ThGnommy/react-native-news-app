import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Link, Text } from "native-base";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAppSelector } from "../../redux/types";
import { MaterialIcons } from "@expo/vector-icons";

interface TopNewsProps {
  title: string;
  urlImage: string;
  source: string;
  description?: string;
  link?: string;
}

export const TopNewsSliderItem = ({
  title,
  urlImage,
  source,
  description,
  link,
}: TopNewsProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const { bookmarksScreen } = useAppSelector((state) => state.news);

  const news = {
    title,
    urlImage,
    source,
    description,
    link,
  };

  const updateBookmarks = async () => {
    const user: any = auth.currentUser;

    const userRef = doc(db, "users", user?.uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      const saved = userData
        .data()
        .bookmarks.findIndex((x: any) => x.title === news.title);

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
    <Link href={link} isExternal={true}>
      <Box width={300} height={250} style={styles.slide}>
        <ImageBackground
          source={{
            uri: urlImage,
          }}
          resizeMode="cover"
          style={styles.image}
        >
          <Flex
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TouchableOpacity onPress={handleBookmarks}>
              <Icon
                as={MaterialIcons}
                name={!bookmarked ? "bookmark-border" : "bookmark"}
                size="xl"
                color="amber.300"
              />
            </TouchableOpacity>
            {source && (
              <Text fontWeight="bold" style={styles.category}>
                {source}
              </Text>
            )}
          </Flex>

          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
            {title}
          </Text>
        </ImageBackground>
      </Box>
    </Link>
  );
};

const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    width: "auto",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  category: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "auto",
    padding: 5,
    alignSelf: "flex-end",
    color: "white",
  },
});
