import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./customizedTheme/theme";
import Header from "./comps/headerComps/Header";
import { Box } from "@mui/material";
import Home from "./comps/HomeComps/Home";
import Cart from "./comps/cartComps/Cart";
import DetailView from "./comps/productComps/DetailView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Box mt="55px">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/product/:id" element={<DetailView />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
