import {
  ADD_T0_CART,
  REMOVE_FROM_CART,
  INCREASE_ITEM_IN_CART,
  DECREASE_ITEM_IN_CART,
} from "../constants/cartActions";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_T0_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (cItem) => cItem.id === item.id
      );

      if (isItemExist) {
        return state;
      }
      return { ...state, cartItems: [...state.cartItems, item] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cItem) => cItem.id !== action.payload
        ),
      };

    case INCREASE_ITEM_IN_CART:
      let { id, value } = action.payload;

      let updatedCartItem = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              mrp: (item.mrp * (value + 1)) / value,
              cost: (item.cost * (value + 1)) / value,
            }
          : item
      );

      return { ...state, cartItems: updatedCartItem };

    case DECREASE_ITEM_IN_CART: {
      let { id, value } = action.payload;

      let modifiedCartItems = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              mrp: item.mrp - item.mrp / value,
              cost: item.cost - item.cost / value,
            }
          : item
      );

      return { ...state, cartItems: modifiedCartItems };
    }
    default:
      return state;
  }
};
