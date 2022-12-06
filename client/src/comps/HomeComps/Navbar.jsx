import React from "react";
import { navData } from "../../Constant/data";
import { Stack, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    padding: "16px",
    backgroundColor: "white",
    overflowX: "overlay",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <Stack
      direction="row"
      spacing={4}
      justifyContent="space-evenly"
      className={classes.navbar}
    >
      {navData.map((data, index) => (
        <Box key={index} textAlign="center">
          <img src={data.url} alt="nav-pic" style={{ width: 64 }} />
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 550 }}
          >
            {data.text}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default Navbar;
