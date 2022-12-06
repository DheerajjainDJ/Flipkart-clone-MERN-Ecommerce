import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  parentComp: {
    marginLeft: "12%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "4%",
    },
    lineHeight: 0,
    textDecoration: "none",
    color: "#fff",
  },
  logo: {
    width: 75,
  },
  subURL: {
    marginLeft: 4,
    width: 10,
    height: 10,
  },
  headerButtons: {
    margin: "0% 7% 0% auto",
    [theme.breakpoints.down("lg")]: {
      margin: "0% 4% 0% auto",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
