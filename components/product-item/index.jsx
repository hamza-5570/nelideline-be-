import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const ProductItem = ({ images, name, price, currency, productId }) => {
  const dispatch = useDispatch();
  return (
    <div className="product-item">
      <div className="product__image">
        <Link href={`/product/${productId}`}>
          <a>
            <img src={images} alt="product" />
            {/* <span className="product__discount">10%</span> */}
          </a>
        </Link>
      </div>
      <div className="product__description">
        <h3>{name}</h3>
        <div className={'product__price product__price--discount'}>
          <h4>{currency + price}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
