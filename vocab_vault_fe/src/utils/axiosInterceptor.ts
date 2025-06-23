import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getTokenByLocalStorage, setTokenByLocalStorage } from './common';
import { store } from 'redux';
import { logout } from 'pages/auth/authSlice';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_URL_API,
   withCredentials: true, // để chấp nhận lưu cookie
});

// Create a separate axios instance for refresh token requests to avoid interceptor loops
const axiosRefresh = axios.create({
   baseURL: import.meta.env.VITE_URL_API,
   withCredentials: true, // để chấp nhận lưu cookie
});

// Define types for queue items
interface QueueItem {
   resolve: (value?: any) => void;
   reject: (reason?: any) => void;
}

// Extend the InternalAxiosRequestConfig type to include _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
   _retry?: boolean;
   _isRefreshTokenRequest?: boolean;
}

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Queue of failed requests to retry after token refresh
let failedQueue: QueueItem[] = [];

// Process the queue of failed requests
const processQueue = (error: Error | null, token: string | null = null) => {
   failedQueue.forEach((prom) => {
      if (error) {
         prom.reject(error);
      } else {
         prom.resolve(token);
      }
   });

   failedQueue = [];
};

// Handle logout
const handleLogout = () => {
   store.dispatch(logout());

   // Redirect to login page
   window.location.href = '/sign-in';
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
   function (config) {
      const accessToken = getTokenByLocalStorage();

      if (accessToken) {
         config.headers.Authorization = 'Bearer ' + accessToken.toString().trim();
      }
      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
   function (response) {
      return response;
   },
   async function (error: AxiosError) {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;

      // If there's no config or no response, just reject
      if (!originalRequest || !error.response) {
         return Promise.reject(error);
      }

      // If error is not 401 or request has already been retried, reject
      if (error.response.status !== 401 || originalRequest._retry) {
         return Promise.reject(error);
      }

      // Mark the request as retried to prevent infinite loops
      originalRequest._retry = true;

      // If already refreshing token, add request to queue
      if (isRefreshing) {
         return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
         })
            .then((token) => {
               if (originalRequest.headers) {
                  originalRequest.headers.Authorization = 'Bearer ' + token;
               }
               return axiosInstance(originalRequest);
            })
            .catch((err) => {
               return Promise.reject(err);
            });
      }

      isRefreshing = true;

      try {
         // Use the separate axios instance for refresh token requests
         const response = await axiosRefresh.post('/api/auth/refresh-token');

         if (response.data.status === 200 && response.data.data && response.data.data.accessToken) {
            // Update token in local storage
            const newToken = response.data.data.accessToken;
            setTokenByLocalStorage(newToken);

            // Update Authorization header for the original request
            if (originalRequest.headers) {
               originalRequest.headers.Authorization = 'Bearer ' + newToken;
            }

            // Process queue with new token
            processQueue(null, newToken);

            // Return the original request with new token
            return axiosInstance(originalRequest);
         } else {
            // If refresh token fails, handle logout
            processQueue(new Error('Refresh token failed'), null);
            handleLogout();
            return Promise.reject(error);
         }
      } catch (refreshError) {
         // If refresh token request fails
         processQueue(refreshError instanceof Error ? refreshError : new Error('Unknown error'), null);
         handleLogout();
         return Promise.reject(refreshError);
      } finally {
         isRefreshing = false;
      }
   },
);

export default axiosInstance;
