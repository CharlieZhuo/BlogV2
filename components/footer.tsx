import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { navItems } from "./header/headerBar";

export default function Footer() {
  return (
    <Paper elevation={2} sx={{ paddingBlock: "2rem" }}>
      <Container maxWidth="md">
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" component="span">
              LOGO
            </Typography>
          </Box>
          <Stack sx={{ alignItems: "center" }}>
            {navItems.map((page) => (
              <Link href={page.link} key={page.name} passHref>
                <Button
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Stack>
        </Stack>
        <Divider></Divider>

        <Typography sx={{ my: "1rem" }} variant="caption">
          ©2021-present Charlie Zhuo. All Rights Reserved.
        </Typography>
      </Container>
    </Paper>
  );
}
