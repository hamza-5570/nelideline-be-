import axios from "axios";
import axiosClient from "../../helper";
import { TYPES } from "../actionTypes";
////////////////////////////////////////////////////////////
const {
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_LOADING,
  UPDATE_USER_CART,
  FILTER_PRODUCTS_LOADER,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAIL,
} = TYPES;
////////////////////////////////////////////////////////////
export const getAllProductsLoading = () => ({
  type: GET_ALL_PRODUCTS_LOADING,
});
export const getAllProductsSuccess = (data) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: data,
});
export const getFilterSuccess = (data) => ({
  type: FILTER_PRODUCTS_SUCCESS,
  payload: data,
});
export const UpdateUserCart = (data) => ({
  type: UPDATE_USER_CART,
  payload: data,
});

export const FilterProducts = (type) => async (dispatch) => {
  console.log("hello getFilterSuccess in redux", type);
  dispatch(getFilterSuccess(type));
};
////////////////////////////////////////////////////////////
export const getAllProducts = () => async (dispatch) => {
  dispatch(getAllProductsLoading());
  axiosClient()
    .get(`/product/getAll`)
    .then((res) => {
      dispatch(getAllProductsSuccess(res?.data?.data));
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
export const addToCart = (productId) => async (dispatch) => {
  return await axiosClient()
    .post(`/user/addToCart/${productId}`, { qty: "1" })
    .then((res) => {
      dispatch(UpdateUserCart(res?.data?.data));
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
export const removeFromCart = (productId) => async (dispatch) => {
  return await axiosClient()
    .post(`/user/removeToCart/${productId}`, { qty: "1" })
    .then((res) => {
      dispatch(UpdateUserCart(res?.data?.data));
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
