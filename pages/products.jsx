import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';
import { useState } from 'react';
import {FilterProducts} from "../redux/actions/productAction"
import { useDispatch } from 'react-redux';


const Products = () => {
  const dispatch=useDispatch()
  const [selectedValue,setSelectedValue]=useState()
  const handleFilterByCategory = (categoryname) =>{
   
    setSelectedValue(categoryname)

  }

  const handleSubmitFilter = (e)=>{
    e.preventDefault()
    dispatch(FilterProducts(selectedValue))
  }
  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter handleFilterByCategory={handleFilterByCategory} selectedValue={selectedValue} handleSubmitFilter={handleSubmitFilter}/>
          <ProductsContent />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;
