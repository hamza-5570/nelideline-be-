import React from 'react';
import useSwr from 'swr';
import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { useSelector } from 'react-redux';

const ProductsContent = () => {
  const { allProducts, productsLoading } = useSelector(
    (state) => state.productReducer
  );
  console.log("allProducts@@",allProducts)
  return (
    <React.Fragment>
      {productsLoading ? (
        <React.Fragment>
          <ProductsLoading />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {allProducts?.length < 1 ? (
            <div>No Products Found :(</div>
          ) : (
            <section className="products-list">
              {allProducts?.map((item) => (
                <ProductItem
                  name={item?.product_name}
                  images={item?.product_image_url}
                  price={item?.price}
                  currency={item?.currency}
                  productId={item?._id}
                />
              ))}
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductsContent;
