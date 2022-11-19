import React from 'react';

import { Container, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
  selectMessage,
  selectTotalContactsCount,
} from 'redux/selectors';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { fetchContacts } from 'redux/operations';
import { setError, setMessage } from 'redux/contactsSlice';
export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);
  const totalContactsCount = useSelector(selectTotalContactsCount);
  const loadingToastId = useRef(null);
  useEffect(() => {
    if (message) {
      toast.info(message);
      dispatch(setMessage(null));
    }
  }, [message, dispatch]);
  useEffect(() => {
    if (isLoading && !loadingToastId.current) {
      loadingToastId.current = toast.loading('Loading', { autoClose: false });
      return;
    }
    if (!isLoading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isLoading]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <Container>
        <Title>Phonebook</Title>
        <ContactForm />
        <div>
          <h2>Contacts</h2>
          {contacts.length > 0 ? (
            <div>
              <Filter />
              <ContactList />
              <p>Total: {totalContactsCount}</p>
            </div>
          ) : (
            <div>Contacts list is empty</div>
          )}
        </div>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
