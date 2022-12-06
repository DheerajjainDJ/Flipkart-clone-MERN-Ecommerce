import { styled } from "@mui/material/styles";

export const LoginButton = styled("button")(({ theme }) => ({
  color: "#2874f0",
  backgroundColor: "#fff",
  padding: "5px 40px",
  fontWeight: 500,
  border:"1px solid #dbdbdb",
  borderRadius: "2px",
  cursor: "pointer",
  fontSize: "16px",
  [theme.breakpoints.down("md")]: {
    color: "#FFFFFF",
    backgroundColor: "#2874f0",
    border: "1px solid blue",
    marginLeft:"40px"
  },
}));

export const LogInButton = styled("button")(({ theme }) => ({
  width: "100%",
  color: "#FFFFFF",
  height: "48px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor: "#fb641b",
  fontSize: "15px",
  cursor: "pointer",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 20%)",
  border: "none",
  borderRadius: "2px",
}));

export const SignupButton = styled("button")(({ theme }) => ({
  width: "100%",
  color: "#2874f0",
  backgroundColor: "#fff",
  height: "48px",
  fontSize: "15px",
  border: "none",
  borderRadius: "2px",
  cursor: "pointer",
  fontWeight: 600,
  boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
}));