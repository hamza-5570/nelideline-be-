import { useDispatch } from 'react-redux';
import { removeFromCart } from 'redux/actions/productAction';
import {QTYIncrement} from "../../../redux/actions/userActions"
import { ToastContainer as Toaster } from '../../toast';

const ShoppingCart = ({ thumb, name, color, size, count, price, id ,index,user_cart}) => {
  const dispatch = useDispatch();

  const handleCart = async (productId) => {
    let res = {};
    res = await dispatch(removeFromCart(productId));
    Toaster(res);
  };

  const setProductCount = (index,type) => {
  if(type==="increment"){
    let data = user_cart
    data[index].qty=data[index].qty+1
    console.log("data@@",data)
    dispatch(QTYIncrement(data))
  }
  else{
    let data = user_cart
data[index].qty=data[index].qty-1
console.log("data@@",data)
dispatch(QTYIncrement(data))
  }

    // if (count <= 0) {
    //   return;
    // }

    // const payload = {
    //   product: {
    //     thumb,
    //     name,
    //     color,
    //     size,
    //     count,
    //     price,
    //   },
    //   count,
    // };
  };

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
          </div>
        </div>
      </td>
      {/* <td className="cart-item-before" data-label="Color">
        {color}
      </td>
      <td className="cart-item-before" data-label="Size">
        {size}
      </td> */}
      <td>
        <div className="quantity-button">
          <button
            type="button"
            disabled={count===1?true:false}
            onClick={() => setProductCount(index,"decriment")}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={() => setProductCount(index,"increment")}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>${price}</td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => handleCart(id)}></i>
      </td>
    </tr>
  );
};

export default ShoppingCart;
