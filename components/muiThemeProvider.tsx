import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { useMemo } from "react";

export const DarkModeContext = React.createContext({
  inDarkMode: false,
  toggleDarkMode: () => {},
});

export default function MUIThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#B5E5CF",
          },
          secondary: {
            main: "#B99095",
          },
          info: {
            main: "#FCB5AC",
          },
          mode: darkMode ? "dark" : "light",
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.2,
        },
        typography: {
          //   fontSize: 14,
          //   htmlFontSize: 16,
        },
      }),
    [darkMode]
  );
  theme = responsiveFontSizes(theme);

  theme.spacing(20);
  return (
    <DarkModeContext.Provider
      value={{
        inDarkMode: darkMode,
        toggleDarkMode: () => {
          setDarkMode(!darkMode);
        },
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}
