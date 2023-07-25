import React, { useState, useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productAction';
import { auth, logoutUser } from '../../redux/actions/userActions';
import { TYPES } from '../../redux/actionTypes';
import { io } from 'socket.io-client';
import { BASE_URL } from 'helper';

const Header = ({ isErrorPage }) => {
  const router = useRouter();
  // const { cartItems } = useSelector((state) => state.cart);
  const arrayPaths = ['/'];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };
  const { userData, socket } = useSelector((state) => state.userReducer);
  const { allProducts } = useSelector((state) => state.productReducer);

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);
  useEffect(() => {
    if (Cookies.get('token')) {
      if (Object.keys(userData).length === 0) {
        dispatch(auth());
        const socket = io.connect(BASE_URL);
        dispatch({
          type: TYPES.CONNECT_SOCKET,
          payload: socket,
        });
      }
      if (allProducts.length === 0) {
        dispatch(getAllProducts());
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length > 0 && socket !== null)
      socket.emit('joinUser', userData?._id);
  }, [userData, socket]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  const handleSignout = () => {
    dispatch(logoutUser());
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link href="/">
          <a>
            <h1 className="site-logo">
              <Logo />
              Region Cannabis Company
            </h1>
          </a>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
        >
          <Link href="/products">
            <a>Products</a>
          </Link>
          {/* <a href="#">Inspiration</a> */}
          {/* <a href="#">Rooms</a> */}
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? 'search-form--active' : ''
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          {userData?.user_cart?.length <= 0 ? (
            <button className="btn-cart">
              <i className="icon-cart"></i>
            </button>
          ) : (
            <Link href="/cart">
              <button className="btn-cart">
                <i className="icon-cart"></i>
                <span className="btn-cart__count">
                  {userData?.user_cart?.length}
                </span>
              </button>
            </Link>
           )} 
           <p onClick={()=>router.push("/orders")} style={{marginLeft:"10px",cursor:"pointer",color:"black"}}>orders</p>
          <Link href="/login">
            <button className="site-header__btn-avatar">
              <i className="icon-avatar"></i>
            </button>
          </Link>
          {/* {Cookies.get('token') ? ( */}
            <div
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'black',
              }}
              onClick={handleSignout}
            >
              Logout
            </div>
          {/* ) : (
            ''
          )} */}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
