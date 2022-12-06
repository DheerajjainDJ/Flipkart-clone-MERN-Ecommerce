import React from "react";
import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../Constant/data";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  bannerImg: {
    width: "100%",
    height: "280px",
    [theme.breakpoints.down("md")]: {
      objectFit: "cover",
      width: "100%",
    },
  },
}));
const Banner = () => {
  const classes = useStyles();
  return (
    <Carousel
      navButtonsAlwaysVisible={true}
      navButtonsProps={{
        style: {
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: "white",
          cursor: "unset",
          color: "black",
          borderRadius: 2,
          padding: "35px 10px",
        },
      }}
      autoPlay={true}
      cycleNavigation={true}
      indicators={false}
      animation="slide"
    >
      {bannerData.map((data, index) => (
        <img
          src={data}
          alt="banner-pic"
          key={index}
          className={classes.bannerImg}
        />
      ))}
    </Carousel>
  );
};

export default Banner;
