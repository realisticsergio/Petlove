import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://petlove.b.goit.study/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const token = window.localStorage.getItem('petlove-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
