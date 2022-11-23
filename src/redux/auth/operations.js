import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';
const setAuthHeader = token =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);
const clearAuthHeader = () =>
  (axios.defaults.headers.common.Authorization = '');
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkApi) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (token, thunkApi) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    const { auth } = thunkApi.getState();
    if (!auth.token) return thunkApi.rejectWithValue('No saved token');
    try {
      setAuthHeader(auth.token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
