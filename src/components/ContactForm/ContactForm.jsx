import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
const isNameTaken = ({ contacts, name }) => {
  return contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );
};

const ContactForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const formRef = useRef();
  const contactAdd = () => {
    const inputs = formRef.current.elements;
    const name = inputs.name.value.trim();
    const number = inputs.number.value.trim();
    if (name === '' || number === '') {
      toast.warning(`You must fill all fields`);
      return;
    }
    if (isNameTaken({ contacts, name })) {
      toast.warning(`${name} is already exist`);
      return;
    }
    dispatch(addContact({ name, number }));
    formRef.current.reset();
    closeModal();
  };

  return (
    <div>
      <Dialog open>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              type="name"
              fullWidth
              variant="standard"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="Number"
              name="number"
              type="tel"
              fullWidth
              variant="standard"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={contactAdd}>Add contact</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactForm;
