import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getProductsReducer,
  getProductByIdReducer,
} from "./reducers/ProductsReducer";
import { cartReducer } from "./reducers/CartReducer";
import { userReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
  user: userReducer,
  getProducts: getProductsReducer,
  getProductDetailById: getProductByIdReducer,
  cart: cartReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
