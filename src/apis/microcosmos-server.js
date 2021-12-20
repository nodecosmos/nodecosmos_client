import axios from 'axios';

const microcosmos = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

microcosmos.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: localStorage.getItem('token'),
    };
    return config;
  },
  (error) => {
    throw error;
  },
);

export default microcosmos;
