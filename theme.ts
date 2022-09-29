import { extendTheme } from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "muted",
        rounded: "lg",
      },
    },
  },
  // config,
});
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
