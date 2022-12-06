import React, { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  increaseItemInCart,
  decreaseItemInCart,
} from "../../redux/actions/cartActions";

const GroupButton = ({ item }) => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    setValue((curr) => curr + 1);
    dispatch(increaseItemInCart(item.id, value));
  };

  const decrementHandler = () => {
    setValue((curr) => curr - 1);
    dispatch(decreaseItemInCart(item.id, value));
  };

  return (
    <div>
      <ButtonGroup color="inherit">
        <Button
          disabled={value === 1}
          sx={{ borderRadius: "100%", fontWeight: 600 }}
          onClick={() => decrementHandler()}
        >
          -
        </Button>
        <Button>{value}</Button>
        <Button
          sx={{ borderRadius: "100%", fontWeight: 600 }}
          onClick={() => incrementHandler()}
        >
          +
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default GroupButton;
