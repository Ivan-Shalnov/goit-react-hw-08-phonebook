import ContactList from 'components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
  selectMessage,
} from 'redux/contacts/selectors';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { fetchContacts } from 'redux/contacts/operations';
import { setError, setMessage } from 'redux/contacts/slice';
import { Paper } from '@mui/material';
export const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);
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
  return contacts.length > 0 ? (
    <ContactList />
  ) : (
    <Paper sx={{ width: 'fit-content', margin: '45px auto', padding: '45px' }}>
      <div>Contacts list is empty</div>
    </Paper>
  );
};
