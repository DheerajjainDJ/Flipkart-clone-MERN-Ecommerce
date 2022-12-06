import React from "react";
import Navbar from "../HomeComps/Navbar";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";
import SlideComp from "./SlideComp";

const useStyles = makeStyles((theme) => ({
  leftComponent: {
    width: "83%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  rightComponent: {
    width: "17%",
    margin: "12px 0px 0px 10px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }
}));
const Home = () => {
  const classes = useStyles();
  const adURL =
    "https://rukminim2.flixcart.com/flap/464/708/image/2af118ba18955d4c.jpg?q=70";
  return (
    <div>
      <Navbar />
      <Box sx={{ p: "10px", backgroundColor: "lightgray" }}>
        <Banner />
        <Box display="flex">
          <Box className={classes.leftComponent}>
            <SlideComp timer={true} title="Deals Of The Day" />
          </Box>
          <Box className={classes.rightComponent}>
            <img
              src={adURL}
              alt="ad-pic"
              style={{ border: "3px solid white", width:200 }}
            />
          </Box>
        </Box>
        <SlideComp timer={false} title="Trending Offers" />
        <SlideComp timer={false} title="Hot Deals" />
        <SlideComp timer={false} title="Best Offers" />
        <SlideComp timer={false} title="Hot Deals" />
        <SlideComp timer={false} title="Trending Offers" />
      </Box>
    </div>
  );
};

export default Home;
