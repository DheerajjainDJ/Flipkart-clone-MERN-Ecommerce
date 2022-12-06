import {
  GET_PRODUCTS_FAILS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAILS,
  REVIEW,
} from "../constants/productsConstants";
import axios from "axios";
import * as API from "../../service/api";

const url = "https://mern-ecommerce-flipkart-lite.up.railway.app/clone"

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/products`);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAILS, payload: error.message });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/product/${id}`);
    dispatch({ type: GET_PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAIL_FAILS, payload: error.message });
  }
};

export const reviewProduct = (id, formData) => async (dispatch) => {
  try {
    const { data } = await API.reviewingProduct(id, formData);
    dispatch({ type: REVIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};
