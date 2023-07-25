import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastStyle = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ToastContainer = (res) => {
  return (
    <React.Fragment>
      {res?.success
        ? toast?.success(res?.message, toastStyle)
        : toast?.error(res?.message, toastStyle)}
    </React.Fragment>
  );
};
