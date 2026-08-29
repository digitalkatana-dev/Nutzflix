import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { isTokenExpired } from '../util/helpers';

const instance = axios.create({
  baseURL: 'https://server.nutzflix.net',
});

instance.interceptors.request.use(
  async (config) => {
    const { store } = require('../redux/rootStore');
    const { logout } = require('../redux/slices/userSlice');
    const token = await AsyncStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        store.dispatch(logout());
        Alert.alert('Session expired.', 'Please log in again.');
        throw new axios.Cancel('Token expired, logging out.');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { store } = require('../redux/rootStore');
    const { logout } = require('../redux/slices/userSlice');
    if (err.response?.status === 401) {
      store.dispatch(logout());
      Alert.alert('Session expired.', 'Please log in again.');
    }
    return Promise.reject(err);
  },
);

export default instance;
