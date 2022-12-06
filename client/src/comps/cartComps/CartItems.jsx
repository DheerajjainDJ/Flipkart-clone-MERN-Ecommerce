import React from "react";
import { useDispatch } from "react-redux";
import { Card, Divider, Typography, Button, Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { removeFromCart } from "../../redux/actions/cartActions";
import GroupButton from "./GroupButton";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 2,
    background: "#fff",
  },
}));
const CartItems = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
  return (
    <Card className={classes.card}>
      <Divider />
      <Box display="flex">
        <Stack m={2} spacing={2}>
          <Box
            component="img"
            src={item.url}
            alt="item-pic"
            sx={{ height: 110, width: 110 }}
          />
          <GroupButton item={item} />
        </Stack>
        <Stack m={2} spacing={1.5} alignItems="flex-start">
          <Typography variant="subtitle1" fontWeight="bold">
            {item.title.longTitle}
          </Typography>
          <Typography color="gray">
            Seller:superComNet
            <span>
              <Box
                component="img"
                loading="lazy"
                src={fassured}
                alt="fassured-pic"
                sx={{ width: "75px", margin: "5px 0 0 10px" }}
              />
            </span>
          </Typography>
          <Typography>
            <span style={{ fontWeight: 600 }}>₹{Math.floor(item.cost)}</span>
            &nbsp;&nbsp;&nbsp;
            <span style={{ color: "gray" }}>
              <strike>₹{Math.floor(item.mrp)}</strike>
            </span>
            &nbsp;&nbsp;&nbsp;
            <span style={{ color: "green" }}>{item.discount}off</span>
          </Typography>
          <Button
            onClick={() => removeHandler(item.id)}
            color="inherit"
            sx={{ fontWeight: 600, "&:hover": { color: "#2874f0" } }}
          >
            Remove
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default CartItems;
