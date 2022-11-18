const { createSlice } = require('@reduxjs/toolkit');
const { nanoid } = require('nanoid');

const contactsInitState = { list: [] };
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare({ name, number }) {
        return { payload: { id: nanoid(), name, number } };
      },
    },
    deleteContact(state, action) {
      return {
        ...state,
        list: state.list.filter(contact => contact.id !== action.payload),
      };
    },
  },
});
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
