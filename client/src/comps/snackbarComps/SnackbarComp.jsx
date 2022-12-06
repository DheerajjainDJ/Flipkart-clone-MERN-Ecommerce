import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarComp = ({ signUpOpen, setSignUpOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSignUpOpen(false);
  };
  return (
    <Snackbar
      open={signUpOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="success"
        sx={{ backgroundColor: "black", color: "white" }}
      >
        Successfully Signed Up! Please LogIn To Continue
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComp;
