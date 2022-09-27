import { Flex, useColorMode } from "native-base";
import { ActivityIndicator, StyleSheet } from "react-native";

export const Loader = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      bg={colorMode === "dark" ? "coolGray.800" : "white"}
      justifyContent="center"
      alignItems="center"
      style={styles.loader}
    >
      <ActivityIndicator
        size="large"
        color={colorMode === "dark" ? "white" : "black"}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
});
