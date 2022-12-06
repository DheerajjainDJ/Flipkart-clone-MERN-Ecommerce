import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "50vw",
    height: "85vh",
    [theme.breakpoints.down("md")]: {
      width: "82vw",
      height: "90vh",
    },
  },
  image: {
    backgroundImage: `url(${"https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"})`,
    width: "23vw",
    height: "85vh",
    backgroundColor: "#2874f0",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 85%",
    padding: "40px 33px",
    "& > *": {
      color: "#FFFFFF",
      padding: "20px",
      marginBottom: "14px",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  accountChange: {
    color: "#2874f0",
    cursor: "pointer",
  },
}));
