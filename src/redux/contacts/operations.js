import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CONSTANTS } from './consts';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkApi) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    const { queueToDelete } = thunkApi.getState().contacts;
    if (!queueToDelete.includes(id))
      return thunkApi.rejectWithValue(CONSTANTS.CANCEL_DELETE);
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
