import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import {
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

export const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: "#efefef",
    surface: "#ffffff",
    text: "#333333",
    primary: "#009387",
    secondary: "#3E64FF",
    tertiary: "#454545",
    danger: "#fb2c33",
  },
};

