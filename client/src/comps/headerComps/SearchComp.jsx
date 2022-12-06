import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  InputBase,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { getProducts } from "../../redux/actions/productsActions";

const useStyles = makeStyles((theme) => ({
  searchParent: {
    borderRadius: 2,
    backgroundColor: "#fff",
    position: "relative",
    width: "35%",
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "55%",
      marginLeft: 5,
    },
  },
  productList: {
    background: "#FFFFFF",
    position: "absolute",
    marginTop: "40px",
    color: "black",
    maxWidth: "inherit",
    [theme.breakpoints.down("md")]: {
      maxHeight: "350px",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0px",
      },
    },
  },
  inputRoot: {
    fontSize: "unset",
    width: "100%",
    paddingLeft: 15,
  },
}));

const SearchComp = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.getProducts);

  const searchTextHandler = (value) => {
    setSearchText(value);
    setHidden(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, hidden]);

  const listItemHandler = () => {
    setHidden(true);
    window.scroll(0,0)
  };
  return (
    <div className={classes.searchParent}>
      <InputBase
        placeholder="Search for products, brands and more"
        classes={{
          root: classes.inputRoot,
        }}
        endAdornment={
          <IconButton>
            <Search sx={{ color: "#2874f0", fontWeight: "bold" }} />
          </IconButton>
        }
        onChange={(e) => searchTextHandler(e.target.value)}
      />
      {searchText && (
        <Box className={classes.productList}>
          <List hidden={hidden}>
            <Divider/>
            {products &&
              products
                .filter((product) =>
                  product.title.longTitle
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((product) => (
                  <ListItemButton onClick={listItemHandler}>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemIcon>
                        <Search />
                      </ListItemIcon>
                      {product.title.longTitle}
                    </Link>
                  </ListItemButton>
                ))}
          </List>
        </Box>
      )}
    </div>
  );
};

export default SearchComp;
