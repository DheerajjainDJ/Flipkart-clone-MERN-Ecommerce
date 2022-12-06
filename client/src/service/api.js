import axios from "axios";
import { LOGOUT } from "../redux/constants/userTypes";

const API = axios.create({ baseURL: "https://mern-ecommerce-flipkart-lite.up.railway.app/clone" });

API.interceptors.request.use((request) => {
  if (localStorage.getItem("profile")) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return request;
});

export const signingUpUser = (formData) => API.post("/signUp", formData);

export const loggingInUser = (formData) => API.post("/login", formData);

export const reviewingProduct = (id, formData) =>
  API.post(`/product/${id}/review`, formData);

export const loggingOutUser = () => async (dispatch) => {
  try {
    await API.post("/logout");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const payUsingPaytm = async (data) => {
  try {
    let response = await API.post("/payment", data);
    return response.data;
  } catch (error) {
    console.log("error while invoking payUsingPaytm", error);
  }
};
