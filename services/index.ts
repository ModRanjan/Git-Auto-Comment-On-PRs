import axios from 'axios';
import { toast } from 'react-toastify';

const basdeUrl = process.env.NEXT_PUBLIC_AXIOSBASE_URL;

const instance = axios.create({
  baseURL: basdeUrl,
});
instance.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('jwtToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof error.response !== 'undefined') {
      if (error.message === 'Network Error') {
        toast.error('Network error - make sure API is running');
      } else if (error.response.data.message == 'Validation Error') {
        let errorOb = error.response.data.data;
        toast.error(errorOb);
      } else {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error(error.response);
    }
    return Promise.reject(error);
  },
);

export default instance;
