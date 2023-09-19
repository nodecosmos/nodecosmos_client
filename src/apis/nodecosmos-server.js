import axios from 'axios';

const nodecosmos = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const NC_URI = nodecosmos.getUri();
export const WS_URI = NC_URI.replace('http', 'ws');

export default nodecosmos;
