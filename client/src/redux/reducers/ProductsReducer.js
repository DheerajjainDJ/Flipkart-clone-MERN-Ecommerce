import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAILS,
  REVIEW,
} from "../constants/productsConstants";

const initialState = {
  products: [],
};

export const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS: {
      return { products: action.payload };
    }
    case GET_PRODUCTS_FAILS: {
      return { products: action.payload };
    }
    case REVIEW: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    }
    default:
      return state;
  }
};

export const getProductByIdReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL_SUCCESS:
      return { product: action.payload };
    case GET_PRODUCT_DETAIL_FAILS:
      return { product: action.payload };
    default:
      return state;
  }
};
