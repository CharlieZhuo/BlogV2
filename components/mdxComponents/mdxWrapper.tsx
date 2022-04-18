import HeaderBar from "../headerBar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import React from "react";

export default function MdxWrapper({ children }) {
  return (
    <>
      <HeaderBar />
      <Paper>
        <Container sx={{ my: "4rem" }} maxWidth="md">
          {children}
        </Container>
      </Paper>
    </>
  );
}
