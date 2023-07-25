import ReviewsList from './reviews-list';
import Punctuation from './punctuation';
// import { ProductType } from 'types';
import IMAGE from '../../../assets/image.jpg';

const Reviews = ({ show, product }) => {
  const style = {
    display: show ? 'flex' : 'none',
  };

  const reviews = [
    {
      avatar: IMAGE,
      name: 'Faraz',
      punctuation: 4,
      description: 'Hello how are you ?',
    },
  ];

  return (
    <section style={style} className="product-single__reviews">
      <Punctuation
        punctuation={product?.punctuation?.punctuation}
        countOpinions={product?.punctuation?.countOpinions}
        votes={product?.punctuation?.votes}
      />
      <ReviewsList reviews={reviews} />
    </section>
  );
};

export default Reviews;
