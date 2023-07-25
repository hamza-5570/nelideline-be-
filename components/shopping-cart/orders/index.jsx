import { useDispatch } from 'react-redux';
import { removeFromCart } from 'redux/actions/productAction';
import {QTYIncrement} from "../../../redux/actions/userActions"
import { ToastContainer as Toaster } from '../../toast';

const UserOrder = ({ thumb, name, color, size, count, price, id ,index,handleDeleteOrder}) => {
  const dispatch = useDispatch();

  const handleCart = async (productId) => {
    let res = {};
    res = await dispatch(removeFromCart(productId));
    Toaster(res);
  };

  console.log("name@@",count)
  const setProductCount = (index) => {
console.log("index",index)
dispatch(QTYIncrement(index))
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
        {count}
        {/* <div className="quantity-button">
          <button
            type="button"
            onClick={() => setProductCount(count - 1)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={() => setProductCount(index)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div> */}
      </td>
      <td>${price}</td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => handleDeleteOrder(id)}></i>
      </td>
    </tr>
  );
};

export default UserOrder;
