import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";

const localStorageItemName = "darkMode";

export type darkModePreferenceType = "on" | "off" | "auto";

export const DarkModeContext = React.createContext<{
  inDarkModeContext: boolean;
  darkModeUserPreferenceContext: darkModePreferenceType;
  changePreference: (preference: darkModePreferenceType) => void;
}>({
  inDarkModeContext: false,
  darkModeUserPreferenceContext: "auto",
  changePreference: () => {},
});

export default function MUIThemeProvider({ children }) {
  const [darkModeUserPreferenceState, setDarkModeUserPreferenceState] =
    useState<darkModePreferenceType>("auto");
  const [inDarkModeState, setInDarkModeState] = useState(false);
  const [clientFlag, setCliemtFlag] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setCliemtFlag(true);
    const stored = window.localStorage.getItem(localStorageItemName);
    if (stored === "auto") setInDarkModeState(prefersDarkMode);
    else if (stored === "on") setInDarkModeState(true);
    else setInDarkModeState(false);
  }, [prefersDarkMode, darkModeUserPreferenceState]);
  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: inDarkModeState ? "#346751" : "#ECDBBA",
          },
          secondary: {
            main: "#C84B31",
          },
          //alternative :#121212,#1A1A40,#1e2022,1A1A2E,261c2c
          background: {
            default: inDarkModeState ? "#161616" : "#ffffff",
            paper: inDarkModeState ? "#161616" : "#ffffff",
          },
          mode: inDarkModeState ? "dark" : "light",
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.3,
        },
        typography: {
          //   fontSize: 14,
          //   htmlFontSize: 16,
        },
      }),
    [inDarkModeState]
  );
  theme = responsiveFontSizes(theme);
  theme.spacing(20);

  if (clientFlag) {
    if (inDarkModeState) document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  }

  return (
    <DarkModeContext.Provider
      value={{
        inDarkModeContext: inDarkModeState,
        darkModeUserPreferenceContext: darkModeUserPreferenceState,
        changePreference: (preference: darkModePreferenceType) => {
          setDarkModeUserPreferenceState(preference);

          window.localStorage.setItem(localStorageItemName, preference);
        },
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}
