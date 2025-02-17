import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userConstants} from '../../constants/user';
// Add a request interceptor
axios.interceptors.request.use(
  async function (config) {
    // Check internet connectivity
    const isInternetAvailable = await AsyncStorage.getItem(
      userConstants.isInternetAvailable,
    );
    if (isInternetAvailable === 'false') {
      return Promise.reject({
        response: {
          data: {
            error:
              'No internet connection or internet connection is unreachable. Please check your internet and try again later.',
          },
        },
      });
    }
    const token = await AsyncStorage.getItem(userConstants.tokenVariable);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.timeout = 10000;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  async function (response) {
    const token = response?.data?.data?.token;
    if (token) {
      await AsyncStorage.setItem(userConstants.tokenVariable, token);
    }
    return response;
  },
  async function (error) {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      return Promise.reject({
        response: {
          data: {
            error:
              'Request timed out. Please check your internet and try again later.',
          },
        },
      });
    }
    // if (error?.response?.status === 401) {
    //   await AsyncStorage.removeItem(userConstants.tokenVariable);
    //   return Promise.reject({
    //     response: {
    //       error:
    //         'Your session has expired. Please login again to continue using application.',
    //       status: error?.response?.status || 401,
    //     },
    //   });
    // } else {
    return Promise.reject(error);
    // }
  },
);

export default axios;

export const API_ENDPOINTS = {
  Auth: {
    login: 'users/signin',
    getUserProfile: 'users/profile?userId=',

    // verifyOtp: 'auth/verifyOtp',
    // resendPin: 'auth/resendOtp',
    // resetPassword: 'auth/resetPassword',
    // logout: 'auth/logout',
    // delete: 'auth/deleteAccount',
    // getAnonymousNames: 'auth/suggestAnonymousNames',
    // signup: 'auth/register',
    // socialLogin: 'auth/socialAuth',
    // updateUserProfile: 'user/profile',
    // resumeAccount: 'auth/resumeAccount',
    // getOtherUserProfile: 'user/',
  },
};
