import React, { useEffect, useState } from "react";
import CheckoutStatus from "../checkout-status";
import UserOrder from "./orders/index";
import axiosClient from "helper";
import { createOrder, GetAllOrders } from "redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer as Toaster } from "../toast";
import { useRouter } from "next/router";

const ShoppingCart = ({ userData, orders }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputAlert, setInputAlert] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { socket } = useSelector((state) => state.userReducer);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < userData?.user_cart?.length; index++) {
      total +=
        userData?.user_cart[index].product_id?.price *
        userData?.user_cart[index].qty;
    }
    setTotalAmount(total);
  }, [userData]);

  const handleBillingAddress = (val) => {
    if (inputAlert) setInputAlert(false);
    setBillingAddress(val);
  };
  const handleOrder = async () => {
    if (billingAddress === "") {
      setInputAlert(true);
      setTimeout(() => {
        setInputAlert(false);
      }, 2000);
    } else {
      let order_data = {
        buyer_id: userData?._id,
        amount: totalAmount,
        billing_address: billingAddress,
        user_cart: userData?.user_cart,
      };
      setLoading(true);
      let res = await dispatch(createOrder(order_data));
      if (res?.success) {
        socket.emit("sendNotificationToDriver", {
          to: res?.data?.receiver_id?._id,
        });
        // router.push("/");
      }
      Toaster(res);
      setLoading(false);
    }
  };


  useEffect(() => {
    dispatch(GetAllOrders(userData._id));
    // let user= userData._id
    // axiosClient()
    // .get("order/userOrders",{user})
    // .then((res)=>{
    //   console.log("api response",res.data)
    //   setAllOrders(res.data.data)
    // })
    // .catch((error)=>{
    //   return error
    // })
  }, []);

  const handleDeleteOrder = (id) =>{
    console.log("orderId",id)


    axiosClient()
    .delete(`/order/deleteOrder/${id}`)
    .then((res)=>{
      dispatch(GetAllOrders(userData._id));
    })
    .catch((error)=>{
      return error
    })
  }
  console.log("orders@@", orders);

  console.log("userData@@", userData);
  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Orders</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {orders?.length > 0 ? (
            <React.Fragment>
              <table>
                <tbody>
                  <tr>
                    <th style={{ textAlign: "left" }}>Product</th>
                    {/* <th>Color</th> */}
                    {/* <th>Size</th> */}
                    <th>QTY</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                  {orders.map((obj) =>
                    obj?.user_cart?.map((item, index) => (
                      <UserOrder
                        key={0}
                        thumb={item?.product_id?.product_image_url}
                        name={item?.product_id?.product_name}
                        color="green"
                        price={item?.product_id?.price}
                        size="Xl"
                        count={item?.qty}
                        id={obj?._id}
                        index={index}
                        handleDeleteOrder={handleDeleteOrder}
                      />
                    ))
                  )}
                </tbody>
              </table>
              {/* <div
                style={{
                  width: "100%",
                  display: "grid",
                  justifyContent: "stretch",
                  marginTop: "30px",
                }}
              >
                <p>Please enter your shipping address ?</p>
                <textarea
                  type="text"
                  placeholder="Registrant will have already provided  this to our agent via the POPL NFC reader registration"
                  onChange={(e) => handleBillingAddress(e.target.value)}
                  style={{
                    marginRight: "0px",
                    width: "100%",
                    border: `${inputAlert ? "2" : "1"}px solid ${
                      inputAlert ? "red" : "lightgray"
                    }`,
                    padding: 20,
                    borderRadius: "10px",
                    marginTop: 20,
                  }}
                />
              </div> */}
            </React.Fragment>
          ) : (
            <p
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                fontSize: "20px",
              }}
            >
              Nothing in the cart
            </p>
          )}
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left"></i> Continue Shopping
          </a>

          {/* {userData?.user_cart?.length > 0 && (
            <React.Fragment>
              <div className="cart-actions__items-wrapper">
                <p className="cart-actions__total">
                  Total cost <strong>$ {totalAmount}</strong>
                </p>
                <button
                  className="btn btn--rounded"
                  style={
                    billingAddress === ""
                      ? {
                          backgroundColor: "lightgray",
                          cursor: "not-allowed",
                        }
                      : { backgroundColor: "#FBB03B" }
                  }
                  onClick={handleOrder}
                >
                  {loading ? "Loading..." : "Checkout"}
                </button>
              </div>
            </React.Fragment>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
