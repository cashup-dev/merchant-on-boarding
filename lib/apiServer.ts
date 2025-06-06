import axios from 'axios';
import { cookies } from 'next/headers';

const BASE_URL = 'http://localhost:8800';

export const apiServer = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiServer.interceptors.request.use(async (config) => {
  const token = (await cookies()).get('token')?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 

  return config;
});
