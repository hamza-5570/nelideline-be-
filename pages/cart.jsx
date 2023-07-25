import Layout from '../layouts/Main';
import ShoppingCart from '../components/shopping-cart';
import { useSelector } from 'react-redux';

const Products = () => {
  const { userData } = useSelector((state) => state.userReducer);
  return (
    <Layout>
      <ShoppingCart userData={userData} />
    </Layout>
  );
};

export default Products;
