import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URL = 'http://localhost:3800/';
// export const BASE_URL =
// 'https://6612-2400-adc5-16b-5900-3dda-99c-bf41-3d88.ngrok-free.app';

export function axiosClient() {
  let defaultOptions = {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  let instance = axios.create(defaultOptions);
  instance.interceptors.request.use(function (config) {
    config.headers = {
      'Content-Type': 'application/json',
      'x-auth-token': Cookies.get('token'),
      accept: 'application/json',
    };
    return config;
  });
  return instance;
}
export default axiosClient;
