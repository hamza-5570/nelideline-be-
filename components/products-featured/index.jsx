import { useSelector } from 'react-redux';
import ProductsCarousel from './carousel';
import useSwr from 'swr';

const ProductsFeatured = () => {
  const { allProducts } = useSelector((state) => state.productReducer);
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">
            Show All
          </a>
        </header>

        <ProductsCarousel products={allProducts} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
