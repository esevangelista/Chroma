import axios from 'axios';

export const login = credentials =>
  axios.post('/api/login', credentials);

export const logout = () =>
  axios.post('/api/logout');

export const getSession = () =>
  axios.post('/api/session');

