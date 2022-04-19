import FormControlLabel from "@mui/material/FormControlLabel";
import { dark } from "@mui/material/styles/createPalette";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { DarkModeContext } from "./muiThemeProvider";

export default function DarkModeToggle() {
  const darkMode = useContext(DarkModeContext);
  return (
    <FormControlLabel
      control={
        <Switch
          checked={darkMode.inDarkMode}
          onChange={darkMode.toggleDarkMode}
        />
      }
      label="Dark Mode"
    />
  );
}
