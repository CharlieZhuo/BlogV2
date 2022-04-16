import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";

export default function NightModeToggle() {
  const [checked, setChecked] = useState<boolean>(true);
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      }
      label="Dark Mode"
    />
  );
}
