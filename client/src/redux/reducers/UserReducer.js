import { LOGIN, LOGOUT } from "../constants/userTypes";

export const userReducer = (state = { authState: null }, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authState: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authState: null };
    default:
      return state;
  }
};
