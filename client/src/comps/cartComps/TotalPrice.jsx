import React from "react";
import { Box, Paper, Divider, Typography, Stack } from "@mui/material";

const TotalPrice = ({ cartItems, price, discount }) => {
  return (
    <Paper
      square
      variant="outlined"
      sx={{ fontWeight: "bold", padding: "16px" }}
    >
      <Box p={1}>
        <Typography sx={{ color: "gray", fontWeight: 600 }}>
          PRICE DETAILS
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ "& > *": { fontWeight: 600 } }}>
        <Typography>
          price ({cartItems.length} item)
          <span style={{ float: "right" }}>₹{Math.floor(price)}</span>
        </Typography>
        <Typography>
          Discount
          <span style={{ float: "right", color: "green" }}>
            -₹{Math.floor(discount)}
          </span>
        </Typography>
        <Typography>
          Delivery Charges
          <span style={{ float: "right" }}>₹40</span>
        </Typography>
        <Divider />
        <Typography variant="h6">
          Total Amount
          <span style={{ float: "right" }}>
            ₹{Math.floor(price - discount) + 40}
          </span>
        </Typography>
        <Divider />
        <Typography color="green">
          You will save ₹{Math.floor(discount) - 40} on this order.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default TotalPrice;
