import axiosClient from "../../helper";
import { TYPES } from "../actionTypes";
////////////////////////////////////////////////////////////
const {
  GET_AUTH_DATA,
  LOGOUT_USER,
  EMPTY_CART,
  QTY_INCREMENT,
  GET_ALL_Order_LOADING,
  GET_ALL_Order_SUCCESS,
} = TYPES;
////////////////////////////////////////////////////////////
export const GetAuthDataSuccess = (data) => ({
  type: GET_AUTH_DATA,
  payload: data,
});
export const GetAllOrderSuccess = (data) => ({
  type: GET_ALL_Order_SUCCESS,
  payload: data,
});
export const IncrementQTY = (data) => ({
  type: QTY_INCREMENT,
  payload: data,
});
////////////////////////////////////////////////////////////
export const auth = () => async (dispatch) => {
  axiosClient()
    .get(`/user/auth`)
    .then((res) => {
      dispatch(GetAuthDataSuccess(res?.data?.data));
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
export const GetAllOrders = (userId) => async (dispatch) => {
  axiosClient()
    .get(`/order/userOrders`, userId)
    .then((res) => {
      dispatch(GetAllOrderSuccess(res?.data?.data));
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
export const createOrder = (orderData) => async (dispatch) => {
  return await axiosClient()
    .post(`/order/create`, orderData)
    .then((res) => {
      dispatch({
        type: EMPTY_CART,
      });
      return res?.data;
    })
    .catch((err) => {
      err?.response;
      return err?.response?.data;
    });
};
export const QTYIncrement = (data) => async (dispatch) => {
  console.log("console in action", data);
  dispatch(IncrementQTY(data));
};
