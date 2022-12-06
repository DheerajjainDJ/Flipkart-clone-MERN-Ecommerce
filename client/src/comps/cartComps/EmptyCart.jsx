import React from "react";
import { Box, Stack, Button, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "90vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f3f6",
  },
  paper: {
    width: "90vw",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
}));
const EmptyCart = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const emptycarturl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Stack spacing={1} textAlign="center">
          <Box
            component="img"
            src={emptycarturl}
            sx={{ width: "180px" }}
            alt="empty-pic"
          />
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Your Cart is empty
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Add items to your cart
          </Typography>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              padding: "10px 50px",
            }}
            onClick={() => navigate("/")}
            variant="contained"
            size="large"
          >
            Shop Now
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmptyCart;
