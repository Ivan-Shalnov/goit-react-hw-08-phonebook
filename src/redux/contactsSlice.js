import { fetchContacts, addContact, deleteContact } from './operations';

const { createSlice } = require('@reduxjs/toolkit');

const contactsInitState = {
  list: [],
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
  },
  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = action.payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list.push(action.payload);
      state.message = 'Contact added';
    },
    [deleteContact.isLoading](state) {
      state.isLoading = true;
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.fulfilled](state, action) {
      const index = state.list.findIndex(
        contact => contact.id === action.payload.id
      );
      state.list.splice(index, 1);
      state.message = 'Contact deleted';
    },
  },
});
export const { setError, setMessage } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
