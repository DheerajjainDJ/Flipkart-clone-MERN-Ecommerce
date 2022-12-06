import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import { logoURL, subURL } from "../../Constant/data";
import SearchComp from "./SearchComp";
import HeaderButtons from "./HeaderButtons";
import { useStyles } from "./headerStyles";

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => setOpen(false);
  const list = () => (
    <Box width="250px">
      <List>
        <ListItem>
          <HeaderButtons />
        </ListItem>
      </List>
    </Box>
  );
  return (
    <AppBar sx={{ boxShadow: "none", backgroundColor: "#2874f0" }}>
      <Toolbar sx={{ height: "53px" }}>
        <IconButton
          color="inherit"
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={handleDrawer}>
          <IconButton onClick={handleDrawer} disableRipple>
            <Close />
          </IconButton>
          {list()}
        </Drawer>
        <Box className={classes.parentComp}>
          <Link to="/">
            <img src={logoURL} alt="flipkart-logo" className={classes.logo} />
          </Link>
          <Box display="flex">
            <Typography sx={{ fontSize: "0.65rem", fontStyle: "italic" }}>
              Explore <span style={{ color: "yellow" }}>Plus</span>
            </Typography>
            <img src={subURL} alt="star-pic" className={classes.subURL} />
          </Box>
        </Box>
        <SearchComp />
        <span className={classes.headerButtons}>
          <HeaderButtons />
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
