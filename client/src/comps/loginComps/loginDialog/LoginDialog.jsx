import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import {
  LogInButton,
  SignupButton as WhiteButton,
} from "../../styledComps/styledComps";
import { signingUpUser, loggingInUser } from "../../../service/api";
import { LOGIN } from "../../../redux/constants/userTypes";

import { useStyles } from "./loginDialogStyles";
import SnackbarComp from "../../snackbarComps/SnackbarComp";

const LoginDialog = ({ open, setOpen, setUser }) => {
  const initialValues = {
    login: {
      view: "Login",
      heading: "Login",
      subheading: "Get access to your Orders, Wishlist and Recommendations",
    },
    signUp: {
      view: "Signup",
      heading: "Looks like you're new here!",
      subheading: "Sign up with your details to get started",
    },
  };

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const signupInitialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const classes = useStyles();
  const [loginStatus, setLoginStatus] = useState(initialValues.login);
  const [error, setError] = useState("");
  const [loginValues, setLoginValues] = useState(loginInitialValues);
  const [signupValues, setSignupValues] = useState(signupInitialValues);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setLoginStatus(initialValues.login);
    setLoginValues(loginInitialValues);
    setSignupValues(signupInitialValues);
    setError("");
  };

  const accountStatusHandler = () => {
    setLoginStatus(initialValues.signUp);
  };

  const loginDialogShower = () => {
    setLoginStatus(initialValues.login);
  };

  const signUpTextHandler = (e) => {
    const { name, value } = e.target;
    setSignupValues({
      ...signupValues,
      [name]: value,
    });
  };

  const loginInTextHandler = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loggingInUser(loginValues);
      console.log(data);
      dispatch({ type: LOGIN, payload: data });
      handleClose();
      setUser(JSON.parse(localStorage.getItem("profile")));
    } catch (error) {
      error.response.data && setError(Object.values(error.response.data));
    }
  };

  const signupFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await signingUpUser(signupValues);
      setLoginStatus(initialValues.login);
      if (response) {
        setSignUpOpen(true);
      }
    } catch (error) {
      error.response.data && setError(Object.values(error.response.data));
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogContent className={classes.dialog}>
        <Box display="flex">
          <Box className={classes.image}>
            <Typography variant="h4">{loginStatus.view}</Typography>
            <Typography variant="h6">{loginStatus.subheading}</Typography>
          </Box>
          {loginStatus.view === "Login" ? (
            <form style={{ width: "100%" }} onSubmit={loginFormSubmit}>
              <Stack spacing={3} padding={4}>
                <Typography
                  variant="h6"
                  color="red"
                  align="center"
                  textTransform="capitalize"
                >
                  {error}
                </Typography>
                <TextField
                  variant="standard"
                  label="Enter Email"
                  name="email"
                  value={loginValues.email}
                  onChange={(e) => loginInTextHandler(e)}
                  fullWidth
                />
                <TextField
                  variant="standard"
                  label="Enter Password"
                  name="password"
                  type="password"
                  value={loginValues.password}
                  onChange={(e) => loginInTextHandler(e)}
                  fullWidth
                />

                <Typography variant="caption" color="gray">
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy
                </Typography>
                <LogInButton type="submit">Login</LogInButton>
                <Typography align="center" variant="body2" color="gray">
                  OR
                </Typography>
                <WhiteButton disabled>Request OTP</WhiteButton>
                <Typography
                  onClick={() => accountStatusHandler()}
                  align="center"
                  variant="body2"
                  sx={{ mt: "22px" }}
                  className={classes.accountChange}
                >
                  New to Flipkart? Create an account
                </Typography>
              </Stack>
            </form>
          ) : (
            <form style={{ width: "100%" }} onSubmit={signupFormSubmit}>
              <Stack spacing={2} padding={3}>
                <Typography
                  variant="h6"
                  color="red"
                  align="center"
                  textTransform="capitalize"
                >
                  {error}
                </Typography>
                <TextField
                  variant="standard"
                  name="firstname"
                  label="Enter Firstname"
                  fullWidth
                  value={signupValues.firstname}
                  onChange={(e) => signUpTextHandler(e)}
                />
                <TextField
                  variant="standard"
                  name="lastname"
                  label="Enter Lastname"
                  fullWidth
                  value={signupValues.lastname}
                  onChange={(e) => signUpTextHandler(e)}
                />

                <TextField
                  variant="standard"
                  name="email"
                  label="Enter Email"
                  fullWidth
                  value={signupValues.email}
                  onChange={(e) => signUpTextHandler(e)}
                />
                <TextField
                  variant="standard"
                  name="password"
                  label="Enter Password"
                  type="password"
                  fullWidth
                  value={signupValues.password}
                  onChange={(e) => signUpTextHandler(e)}
                />
                <TextField
                  variant="standard"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={signupValues.confirmPassword}
                  onChange={(e) => signUpTextHandler(e)}
                />
                <LogInButton type="submit">Sign Up</LogInButton>
                <WhiteButton onClick={loginDialogShower}>
                  Existing User? Log in
                </WhiteButton>
              </Stack>
            </form>
          )}
        </Box>
      </DialogContent>
      <SnackbarComp signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} />
    </Dialog>
  );
};

export default LoginDialog;
