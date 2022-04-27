import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext } from "react";
import { DarkModeContext } from "../muiThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import Tooltip from "@mui/material/Tooltip";
export default function DarkModeSwitch() {
  const darkMode = useContext(DarkModeContext);
  const handleAlignment = (event, value) => {
    if (value) {
      darkMode.changePreference(value);
    }
  };
  return (
    <ToggleButtonGroup
      value={darkMode.darkModeUserPreferenceContext}
      exclusive
      onChange={handleAlignment}
      aria-label="darkMode switch"
    >
      <ToggleButton value="off" aria-label="darkMode off">
        <Tooltip title="Switch to light mode.">
          <LightModeIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="auto" aria-label="darkMode auto">
        <Tooltip title="Auto detect darkMode preference.">
          <HdrAutoIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="on" aria-label="darkMode on">
        <Tooltip title="Switch to dark mode.">
          <DarkModeIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
