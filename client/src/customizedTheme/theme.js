import { createTheme} from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
  },
});