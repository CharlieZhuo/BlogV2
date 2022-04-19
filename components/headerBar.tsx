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

import React, { useState } from "react";
import { UserAvatar } from "./userAvatar";
import SearchBox from "./searchBox";
import DarkModeToggle from "./darkModeToggle";
import Link from "next/link";

const navItems = [
  { name: "Blogs", icon: <ArticleIcon />, link: "/blogs" },
  { name: "About", icon: <InfoIcon />, link: "/about" },
  { name: "Contact", icon: <EmailIcon />, link: "/contact" },
];

export default function HeaderBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    //   for color
    <AppBar position="static" aria-labelledby="primary-navigation">
      {/* for margin and width */}
      <Container maxWidth="xl">
        {/* for flex layout */}
        <Toolbar disableGutters={true}>
          <Typography
            align="left"
            variant="h2"
            component="span"
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            LOGO
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
              <Link href={page.link} key={page.name}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
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
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Container>
                <DarkModeToggle></DarkModeToggle>
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
