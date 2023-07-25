import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axiosClient from '../helper';
import Layout from '../layouts/Main';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ToastContainer as Toaster } from '../components/toast';

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get(`token`)) {
      router.push('/');
    }
  }, []);

  const onSubmit = async (data) => {
    if (!loading) {
      setLoading(true);
      axiosClient()
        .post(`/user/login`, data)
        .then((res) => {
          setLoading(false);
          Cookies.set(`token`, res?.data?.token, { expires: 1 });
          Toaster(res?.data);
          router.push('/');
        })
        .catch((err) => {
          setLoading(false);
          Toaster(err?.response?.data);
        });
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to store
              </a>
            </Link>
          </div>
          <div className="form-block">
            <h2 className="form-block__title">Log in</h2>
            <p className="form-block__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="email"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && errors.email.type === 'required' && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>
              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>
              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      type="checkbox"
                      name="keepSigned"
                      id="check-signed-in"
                      ref={register({ required: false })}
                    />
                    <span className="checkbox__check"></span>
                    <p>Keep me signed in</p>
                  </label>
                </div>
                {/* <a
                  href="/forgot-password"
                  className="form__info__forgot-password"
                >
                  Forgot password?
                </a> */}
              </div>
              {/* <div className="form__btns">
                <button type="button" className="btn-social fb-btn">
                  <i className="icon-facebook"></i>Facebook
                </button>
                <button type="button" className="btn-social google-btn">
                  <img src="/images/icons/gmail.svg" alt="gmail" /> Gmail
                </button>
              </div> */}
              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                style={{ height: '60px' }}
              >
                {loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                      className="loader"
                      style={{
                        border: '4px solid white',
                        borderTop: '4px solid black',
                        textAlign: 'center',
                      }}
                    />
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>

            </form>
            <p style={{marginTop:"20px"}}>Don't have an account <span onClick={()=>router.push("/sign-up")} style={{textDecoration:'underline',color:"blue",fontSize:"18px",cursor:"pointer" }}>Register</span></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
