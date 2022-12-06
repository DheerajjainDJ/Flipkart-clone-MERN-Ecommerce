import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";
import { sellerURL, fassured } from "../../Constant/data";
import { LocalOffer as LocalOfferIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/actions/productsActions";
import ProductImg from "./ProductImg";
import ReviewSection from "./ReviewSection";

const useStyles = makeStyles((theme) => ({
  smallText: {
    fontSize: 16,
  },
  grayText: {
    color: "#878787",
  },
  cost: {
    fontSize: "25px",
    fontWeight: 600,
  },
  discount: {
    color: "green",
    fontWeight: 600,
  },
  badge: {
    color: "green",
    fontSize: 14,
  },
}));
const DetailView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const { product } = useSelector((state) => state.getProductDetailById);
  const params = useParams();

  useEffect(() => {
    dispatch(getProductById(params.id));
  }, [dispatch, product]);

  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  return (
    <Box sx={{ padding: { xs: "15px", sm: "35px" } }} backgroundColor="#fff">
      {product && Object.keys(product).length && (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={11} md={6} lg={5}>
            <ProductImg product={product} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={11}
            md={6}
            lg={7}
            sx={{ "& > *": { margin: "8px 0" } }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {product.title.longTitle}
            </Typography>
            <Typography className={clsx(classes.smallText, classes.grayText)}>
              10 Ratings & 10 reviews
              <span>
                <img
                  src={fassured}
                  alt="fassured-pic"
                  style={{
                    width: "50px",
                    marginLeft: "10px",
                  }}
                />
              </span>
            </Typography>
            <Typography>
              <span className={classes.cost}>
                ₹{product.cost}&nbsp;&nbsp;&nbsp;
              </span>
              <span className={clsx(classes.smallText, classes.grayText)}>
                <strike>₹{product.mrp}</strike>&nbsp;&nbsp;&nbsp;
              </span>
              <span className={classes.discount}>{product.discount}off</span>
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <LocalOfferIcon className={classes.badge} />
                <Typography>
                  Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit
                  Card
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LocalOfferIcon className={classes.badge} />
                <Typography>
                  Partner OfferSign up for Flipkart Pay Later and get Flipkart
                  Gift Card worth ₹100
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LocalOfferIcon className={classes.badge} />
                <Typography>
                  Partner OfferNo min Order, Lowest Prices!
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LocalOfferIcon className={classes.badge} />
                <Typography>
                  Special PriceGet extra 14% off (price inclusive of discount)
                </Typography>
              </Stack>
            </Stack>
            <Table>
              <TableBody>
                <TableRow className={classes.smallText}>
                  <TableCell sx={{ color: "gray", verticalAlign: "baseline" }}>
                    Delievery
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {date.toDateString()}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.smallText}>
                  <TableCell sx={{ color: "gray", verticalAlign: "baseline" }}>
                    Warranty
                  </TableCell>
                  <TableCell>No Warranty</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <img
                      src={sellerURL}
                      alt="seller-pic"
                      style={{ width: "390px" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.smallText}>
                  <TableCell sx={{ color: "gray", verticalAlign: "baseline" }}>
                    Seller
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: "#2874f0" }}>
                      SuperComNet
                    </Typography>
                    <Typography>
                      View more sellers starting from ₹310
                    </Typography>
                    <Typography>GST Voice Avalaible</Typography>
                    <Typography>14 Days Return Policy</Typography>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.smallText}>
                  <TableCell
                    sx={{
                      color: "gray",
                      verticalAlign: "baseline",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="justify"
                      sx={{ maxWidth: "100%" }}
                    >
                      {product.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <ReviewSection product={product} user={user} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DetailView;
