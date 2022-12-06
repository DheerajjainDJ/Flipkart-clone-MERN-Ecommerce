import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Box, Typography, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getProducts } from "../../redux/actions/productsActions";

const useStyles = makeStyles((theme) => ({
  parentComp: {
    marginTop: "12px",
    backgroundColor: "white",
  },
  wrapper: {
    padding: "15px 20px",
  },
  timerImg: {
    width: "24px",
    margin: "0px 10px",
  },
  timer: {
    color: "gray",
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SlideComp = ({ timer, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.getProducts);
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {hours} : {minutes} : {seconds}
      </span>
    );
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Box className={classes.parentComp}>
      <Box display="flex" className={classes.wrapper}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {timer && (
          <Box alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
            <img src={timerURL} alt="timer-pic" className={classes.timerImg} />
            <Countdown
              style={{ color: "gray" }}
              date={Date.now() + 5.04e7}
              renderer={renderer}
            />
          </Box>
        )}
        <Button
          sx={{ ml: "auto", borderRadius: "2px", fontWeight: "medium" }}
          variant="contained"
        >
          view all
        </Button>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={true}
          centerMode={true}
          autoPlay={true}
          keyBoardControl={true}
          autoPlaySpeed={8000}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((product, index) => (
            <Link
              to={`product/${product.id}`}
              onClick={() => window.scroll(0, 0)}
              key={index}
              style={{ textDecoration: "none", color: "unset" }}
            >
              <Box textAlign="center" alignItems="center">
                <Box
                  component="img"
                  src={product.url}
                  alt="product-img"
                  sx={{ objectFit: "contain", width: { xs: 80, sm: 95 } }}
                />
                <Typography variant="h6">{product.title.shortTitle}</Typography>
                <Typography sx={{ color: "green", fontWeight: 600 }}>
                  {product.discounts}
                </Typography>
                <Typography sx={{ opacity: 0.6 }}>{product.tagline}</Typography>
              </Box>
            </Link>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default SlideComp;
