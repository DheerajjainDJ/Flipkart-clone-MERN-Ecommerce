import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import EmptyCart from "../cartComps/EmptyCart";
import { Grid, Paper, Box, Typography, Divider, Button } from "@mui/material";
import CartItems from "./CartItems";
import TotalPrice from "./TotalPrice";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    padding: "30px 60px",
    [theme.breakpoints.down("sm")]: {
      padding: "25px",
    },
  },
}));

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const classes = useStyles();

  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();

  const totalAmount = () => {
    let price = 0;
    let discount = 0;
    // eslint-disable-next-line array-callback-return
    cartItems.map((cartItem) => {
      price += cartItem.mrp;
      discount += cartItem.mrp - cartItem.cost;
    });
    setPrice(price);
    setDiscount(discount);
  };

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const orderButtonHandler = async (totalPrice) => {
    let response = await payUsingPaytm({
      amount: totalPrice,
      email: "abc@gmail.com",
    });
    if (!response) {
      return;
    }
    let information = {
      action: "https://securegw-stage.paytm.in/order/process",
      params: response,
    };
    post(information);
  };
  return (
    <div>
      {cartItems.length ? (
        <Grid
          container
          spacing={2}
          className={classes.parentGrid}
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Paper square variant="outlined">
              <Box p={2}>
                <Typography variant="h6">
                  My Cart ({cartItems.length})
                </Typography>
              </Box>
              {cartItems.map((cItem, index) => (
                <CartItems item={cItem} key={index} />
              ))}
              <Divider />
              <Box p={2}>
                <Button
                  onClick={() => orderButtonHandler(price - discount + 40)}
                  sx={{
                    display: "flex",
                    ml: "auto",
                    padding: "12px 60px",
                    background: "#fb641b",
                    borderRadius: "2px",
                    fontWeight: 600,
                  }}
                  variant="contained"
                >
                  Place order
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TotalPrice
              cartItems={cartItems}
              price={price}
              discount={discount}
            />
          </Grid>
        </Grid>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
