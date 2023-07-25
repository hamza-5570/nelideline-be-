import { TYPES } from "../actionTypes";

const {
  GET_AUTH_DATA,
  LOGOUT_USER,
  UPDATE_USER_CART,
  EMPTY_CART,
  CONNECT_SOCKET,
  QTY_INCREMENT,
  GET_ALL_Order_SUCCESS,
} = TYPES;

const initialState = {
  userData: {},
  orders: [],
  socket: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case QTY_INCREMENT:
      // console.log("reducer", action.payload);
      // state.userData.user_cart[action.payload].qty + 1;
      // state.userData.user_cart[action.payload].qty = +1;

      return {
        ...state,
        userData: {
          ...state.userData,
          user_cart: action.payload,
        },
      };
    case GET_ALL_Order_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_AUTH_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: {},
      };
    case UPDATE_USER_CART:
      state.userData.user_cart = action.payload.user_cart;
      return {
        ...state,
        userData: state.userData,
      };
    case EMPTY_CART:
      state.userData.user_cart = [];
      return {
        ...state,
        userData: state.userData,
      };
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}
