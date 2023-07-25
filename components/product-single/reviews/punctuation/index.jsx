import Rater from 'react-rater';

const Punctuation = ({ punctuation, countOpinions }) => {
  const percentageBar = (count) => {
    return (count * 100) / countOpinions;
  };

  const votes = [
    {
      value: 'English',
      count: 10,
    },
    {
      value: 'Urdu',
      count: 100,
    },
    {
      value: 'French',
      count: 70,
    },
  ];

  return (
    <section className="product-punctuation">
      <div className="product-punctuation__values">
        <h3>Faraz</h3>
        <Rater total={5} interactive={false} rating={3.5} />
        <p>
          <i className="icon-avatar"></i>
          Faraz all opinions
        </p>
      </div>
      <div className="product-punctuation__rates">
        <ul className="punctuations-lists">
          {votes?.map((vote, index) => (
            <li key={vote?.index} className="punctuation-item">
              <Rater total={1} interactive={false} rating={1} />
              <span>{vote?.value}</span>
              <div className="punctuation-item__bar">
                <div
                  style={{ width: percentageBar(vote?.count) + '%' }}
                  className="punctuation-item__bar__current"
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="punctuation-btn-wrapper">
        <button type="button" className="btn btn--rounded btn--yellow">
          Add opinion
        </button>
      </div>
    </section>
  );
};

export default Punctuation;
