import {
  ADD_T0_CART,
  REMOVE_FROM_CART,
  INCREASE_ITEM_IN_CART,
  DECREASE_ITEM_IN_CART,
} from "../constants/cartActions";
import axios from "axios";

const url = "https://mern-ecommerce-flipkart-lite.up.railway.app/clone";

export const addToCart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/product/${id}`);
    dispatch({ type: ADD_T0_CART, payload: data });
  } catch (error) {
    console.log("Error while calling add to cart func:", error);
  }
};

export const removeFromCart = (id) => (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  } catch (error) {
    console.log("error while deleting a item from cart:", error);
  }
};

export const increaseItemInCart = (id, value) => (dispatch) => {
  try {
    dispatch({ type: INCREASE_ITEM_IN_CART, payload: { id, value } });
  } catch (error) {
    console.log("Error while increasing Item in cart", error);
  }
};

export const decreaseItemInCart = (id, value) => (dispatch) => {
  try {
    dispatch({ type: DECREASE_ITEM_IN_CART, payload: { id, value } });
  } catch (error) {
    console.log("Error while decreasing Item in cart", error);
  }
};
