import { TYPES } from "../actionTypes";

const {
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_LOADING,
  FILTER_PRODUCTS_SUCCESS,
} = TYPES;

const initialState = {
  productsLoading: false,
  allProducts: [],
  allproduct: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
        allproduct: action.payload,
        productsLoading: false,
      };
    case FILTER_PRODUCTS_SUCCESS:
      console.log("some action", action.payload);
      const filterArray = state.allproduct.filter(
        (item) => item.category.name === action.payload
      );

      console.log("filterArray @@@", filterArray);

      return {
        ...state,
        allProducts: filterArray,
        productsLoading: false,
      };
    default:
      return state;
  }
}
