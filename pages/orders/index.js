import Layout from "../../layouts/Main";
// import ShoppingCart from "../../components/shopping-cart";
import ShoppingCart from "../../components/shopping-cart/order";

import { useSelector } from "react-redux";

const Products = () => {
  const { userData, orders } = useSelector((state) => state.userReducer);
  return (
    <Layout>
      <ShoppingCart userData={userData} orders={orders} />
    </Layout>
  );
};

export default Products;
