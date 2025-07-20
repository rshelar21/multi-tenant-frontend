import axios, { AxiosRequestConfig, isCancel, AxiosError } from 'axios';
import { store } from '@/store/store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (err) => {
    // const originalRequest = err.config;
    // console.log(err)
    // console.log(originalRequest);
    // if (err.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const data = await request({
    //       options: {
    //         url: `auth/refresh`,
    //       },
    //     });

    //     axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
    //     originalRequest.headers['Authorization'] = `Bearer ${data}`;
    //     return axios(originalRequest);
    //   } catch (e) {
    //     return Promise.reject(e);
    //   }
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
  }
);

export const request = async ({ options }: { options: AxiosRequestConfig }) => {
  try {
    const { data } = await axiosInstance({ ...options });
    return { data };
  } catch (err) {
    if (isCancel(err)) {
      return { error: new Error('Request canceled') as AxiosError, data: null };
    }
    return { error: err as AxiosError, data: null };
  }
};

export default axiosInstance;
