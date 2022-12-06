import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Stack } from "@mui/material";
import { LogInButton } from "../styledComps/styledComps";
import { ShoppingCart, FlashOn } from "@mui/icons-material";
import { addToCart } from "../../redux/actions/cartActions";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";

const ProductImg = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartBtnHandler = (id) => {
    dispatch(addToCart(id));
    navigate("/cart");
  };

  const orderButtonHandler = async (cost) => {
    let response = await payUsingPaytm({
      amount: cost,
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
    <Box textAlign="center">
      <Box
        component="img"
        src={product.detailUrl}
        sx={{ width: { xs: "100%", md: "inherit" } }}
        alt="product-pic"
        p={2}
        border="1px dotted lightgray"
      />
      <Stack direction="row" spacing={2}>
        <LogInButton onClick={() => cartBtnHandler(product.id)}>
          <ShoppingCart />
          ADD TO CART
        </LogInButton>
        <LogInButton onClick={() => orderButtonHandler(product.cost)}>
          <FlashOn />
          BUY NOW
        </LogInButton>
      </Stack>
    </Box>
  );
};

export default ProductImg;
