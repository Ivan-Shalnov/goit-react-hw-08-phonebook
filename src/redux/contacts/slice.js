import { fetchContacts, addContact, deleteContact } from './operations';

import { createSlice } from '@reduxjs/toolkit';
import { CONSTANTS } from './consts';

const contactsInitState = {
  list: [],
  queueToDelete: [],
  isLoading: false,
  error: null,
  message: null,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    addToDeleteQueque(state, action) {
      state.queueToDelete.push(action.payload);
    },
    deleteFromDeleteQueque(state, action) {
      state.queueToDelete = state.queueToDelete.filter(
        id => id !== action.payload
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.list.push(action.payload);
        state.message = 'Contact added';
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === CONSTANTS.CANCEL_DELETE) {
          state.message = CONSTANTS.CANCEL_DELETE;
          return;
        }
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.queueToDelete = state.queueToDelete.filter(
          id => id !== action.payload.id
        );

        const index = state.list.findIndex(
          contact => contact.id === action.payload.id
        );
        state.list.splice(index, 1);
        state.message = 'Contact deleted';
      });
  },
});
export const {
  setError,
  setMessage,
  addToDeleteQueque,
  deleteFromDeleteQueque,
} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
