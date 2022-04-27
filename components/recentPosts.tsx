import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { DarkModeContext } from "./muiThemeProvider";

export default function RecentPosts({ LatestPosts }) {
  const darkMode = useContext(DarkModeContext);
  return (
    <Box>
      <Typography
        color={darkMode.inDarkModeContext ? "primary.light" : "primary.dark"}
        variant="h4"
      >
        最近添加
      </Typography>
      {LatestPosts.map()}
    </Box>
  );
}
