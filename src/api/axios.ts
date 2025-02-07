import { API_URL } from '@constants/env';
import axios from 'axios';

export const restClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

export const authorizeAxiosClient = ({ token }: { token: string }) => {
  restClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const unauthorizeAxiosClient = () => {
  restClient.defaults.headers.Authorization = '';
};

export const addLocaleToAxiosClient = (locale: string) => {
  restClient.defaults.headers['x-custom-lang'] = locale;
};
