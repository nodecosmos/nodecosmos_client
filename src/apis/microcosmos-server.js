import axios from 'axios';

const microcosmos = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});

export const setAuthorizationToken = () => {
  microcosmos.defaults.headers.common.Authorization = localStorage.getItem('token');
};

export default microcosmos;
