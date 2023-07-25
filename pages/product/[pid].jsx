import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Main';
import Footer from '../../components/footer';
import Breadcrumb from '../../components/breadcrumb';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import Reviews from '../../components/product-single/reviews';
import ProductsFeatured from '../../components/products-featured';
import Description from '../../components/product-single/description';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Product = () => {
  const [showBlock, setShowBlock] = useState('description');
  const [selectedProduct, setSelectedProduct] = useState({});

  const router = useRouter();

  const { allProducts } = useSelector((state) => state.productReducer);

  const { pid } = router.query;

  useEffect(() => {
    let findProduct = allProducts?.find((x) => {
      return x?._id === pid;
    });
    setSelectedProduct(findProduct);
  }, [pid, allProducts]);
  return (
    <Layout>
      <Breadcrumb />
      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={[selectedProduct?.product_image_url]} />
            <Content product={selectedProduct} />
          </div>
          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock('description')}
                className={`btn btn--rounded ${
                  showBlock === 'description' ? 'btn--active' : ''
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock('reviews')}
                className={`btn btn--rounded ${
                  showBlock === 'reviews' ? 'btn--active' : ''
                }`}
              >
                Reviews (2)
              </button>
            </div>
            <Description show={showBlock === 'description'} />
            <Reviews product={selectedProduct} show={showBlock === 'reviews'} />
          </div>
        </div>
      </section>
      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
