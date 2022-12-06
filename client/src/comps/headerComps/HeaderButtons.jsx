import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Typography, Box, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import LoginDialog from "../loginComps/loginDialog/LoginDialog";
import { LoginButton } from "../styledComps/styledComps";
import Profile from "../loginComps/Profile";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    width: "300px",
    justifyContent: "space-between",
    "& > *": {
      textDecoration: "none",
      color: "#ffffff",
      alignItems: "center",
      justifyContent:"center",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        margin: "10px 0",
        color:"#2874f0",
      },
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
}));

const HeaderButtons = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const loginHandler = () => {
    setOpen(true);
  };
  return (
    <Box className={classes.wrapper}>
      {user ? (
        <Profile user={user} setUser={setUser} />
      ) : (
        <LoginButton onClick={() => loginHandler()}>Login</LoginButton>
      )}
      <Typography>More</Typography>
      <Link to="/cart">
        <Box display="flex">
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCart />
          </Badge>
          <Typography sx={{ ml: "5px" }}>Cart</Typography>
        </Box>
      </Link>
      <LoginDialog open={open} setOpen={setOpen} setUser={setUser} />
    </Box>
  );
};

export default HeaderButtons;
