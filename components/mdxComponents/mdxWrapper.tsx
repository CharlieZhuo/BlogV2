import HeaderBar from "../headerBar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import React from "react";

export default function MdxWrapper({ children }) {
  return (
    <>
      <Paper>
        <HeaderBar />
        <Container sx={{ paddingBlockStart: "4rem" }} maxWidth="md">
          {children}
        </Container>
      </Paper>
    </>
  );
}
