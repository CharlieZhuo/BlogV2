import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";

import React, { useContext, useState } from "react";
import { UserAvatar } from "./userAvatar";
import SearchBox from "./searchBox";
import DarkModeSwitch from "./darkModeSwitch";
import Link from "next/link";
import Card from "@mui/material/Card";
import { DarkModeContext } from "../muiThemeProvider";

export const navItems = [
  { name: "Blogs", icon: <ArticleIcon />, link: "/blogs" },
  { name: "About", icon: <InfoIcon />, link: "/about" },
  { name: "Contact", icon: <EmailIcon />, link: "/contact" },
];

export default function HeaderBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const darkMode = useContext(DarkModeContext);

  return (
    //   for elevation
    <AppBar position="static" aria-labelledby="primary-navigation">
      {/* for margin and width */}
      <Container maxWidth="md">
        {/* for flex layout */}
        <Toolbar disableGutters={true}>
          <Typography
            align="left"
            variant="h4"
            component="span"
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            CharlieTech
          </Typography>

          {/* button for large screen */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "30px",
            }}
          >
            {navItems.map((page) => (
              <Link href={page.link} key={page.name} passHref>
                <Button
                  sx={{
                    my: 2,
                    color: (theme) => theme.palette.text.primary,
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* drawer */}
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              elevation={1}
            >
              <Container>
                <Card sx={{ display: "inline-block" }} elevation={2}>
                  <DarkModeSwitch></DarkModeSwitch>
                  <Typography>DarkMode switch</Typography>
                </Card>
                <Divider></Divider>
                <Container
                  sx={{ my: "30px", display: "flex", justifyContent: "center" }}
                >
                  <UserAvatar
                    enableMenu={true}
                    user={{ name: "zz", avatar: { url: "test" } }}
                  ></UserAvatar>
                </Container>

                <Divider></Divider>
                <List>
                  {navItems.map((item) => (
                    <Link href={item.link} key={item.name}>
                      <ListItem key={item.name} button>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider></Divider>
                <SearchBox></SearchBox>
              </Container>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
