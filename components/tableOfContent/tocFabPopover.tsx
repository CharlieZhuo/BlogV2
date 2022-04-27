import Fab from "@mui/material/Fab";
import TocIcon from "@mui/icons-material/Toc";
import CloseIcon from "@mui/icons-material/Close";
import Grow from "@mui/material/Grow";

import { alpha } from "@mui/material/styles";
import { useState } from "react";
import Container from "@mui/material/Container";
import Zoom from "@mui/material/Zoom";
export default function TocFabPopover({ children }) {
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
  };

  return (
    <>
      {" "}
      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          display: { lg: "none" },
          position: "fixed",
          left: "80vw",
          bottom: "10vh",
        }}
        onClick={handleClick}
      >
        {!open ? <TocIcon /> : <CloseIcon />}
      </Fab>
      <Grow in={open}>
        <Container
          disableGutters
          sx={{
            display: { lg: "none" },
            position: "fixed",
            right: "0vw",
            width: "15rem",
            top: "15vh",
          }}
        >
          {children}
        </Container>
      </Grow>
    </>
  );
}
