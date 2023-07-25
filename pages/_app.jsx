import React, { Fragment } from 'react';
import 'swiper/swiper.scss';
import Router from 'next/router';
import '../assets/css/styles.scss';
import store from '../redux/store';
import 'rc-slider/assets/index.css';
import { Provider } from 'react-redux';
import 'react-rater/lib/react-rater.css';
import { ToastContainer } from 'react-toastify';

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }) => (
  <Fragment>
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  </Fragment>
);

// export default wrapper.withRedux(MyApp);
export default MyApp;
