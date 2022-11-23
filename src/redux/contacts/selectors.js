import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from 'redux/filter/selectors';
export const selectContacts = state => {
  return state.contacts.list.filter(
    contact => !state.contacts.queueToDelete.includes(contact.id)
  );
};
export const selectQueueToDelete = state => state.contacts.queueToDelete;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectMessage = state => state.contacts.message;
export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
