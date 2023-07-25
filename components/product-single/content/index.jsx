import React, { useState } from 'react';
import CheckboxColor from '../../products-filter/form-builder/checkbox-color';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
} from '../../../redux/actions/productAction';
import { ToastContainer as Toaster } from '../../../components/toast';

const Content = ({ product }) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handleProduct = async (productId) => {
    if (!loading) {
      setLoading(true);
      let res = {};
      if (
        userData?.user_cart?.find((x) => {
          return x?.product_id?._id === product?._id;
        })?._id
      ) {
        res = await dispatch(removeFromCart(productId));
      } else {
        res = await dispatch(addToCart(productId));
      }
      Toaster(res);
      setLoading(false);
    }
  };
  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product?._id?.slice(product?._id?.length - 6)}
        </h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product?.product_name}</h2>
        <div className="product__prices">
          <h4>{product?.currency + product?.price}</h4>
          <span>{product?.currency + (product?.price - 22)}</span>
        </div>
      </div>
      <div className="product-content__filters">
        {/* <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            <CheckboxColor
              type={'radio'}
              name="product-color"
              color={'black'}
              valueName={'1111'}
              // onChange={onColorSet}
            />
            <CheckboxColor
              type={'radio'}
              name="product-color"
              color={'gray'}
              valueName={'2222'}
              // onChange={onColorSet}
            />
            <CheckboxColor
              type={'radio'}
              name="product-color"
              color={'lightgray'}
              valueName={'2222'}
              // onChange={onColorSet}
            />
          </div>
        </div> */}
        <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select
              // onChange={onSelectChange}
              >
                <option>Choose size</option>
                <option value="xs">xs</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          {/* <h5>Quantity:</h5> */}
          <div className="quantity-buttons">
            {/* <div className="quantity-button">
              <button
                type="button"
                onClick={count >= 1 ? () => setCount(count - 1) : ''}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={
                  count < product?.quantity ? () => setCount(count + 1) : ''
                }
                className="quantity-button__btn"
              >
                +
              </button>
            </div> */}
            <button
              // type="submit"
              onClick={() => handleProduct(product?._id)}
              className="btn btn--rounded btn--yellow"
            >
              {loading
                ? 'Loading...'
                : userData?.user_cart?.find((x) => {
                    return x?.product_id?._id === product?._id;
                  })
                ? 'Remove from cart'
                : 'Add to cart'}
            </button>
            {/* <button
              // type="button"
              // onClick={toggleFav}
              className={`btn-heart btn-heart--active`}
            >
              <i className="icon-heart"></i>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
