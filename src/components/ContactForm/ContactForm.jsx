import React from 'react';

import { Input } from 'components/common.styled';
import { ContactFormBtn, Form } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { setMessage } from 'redux/contactsSlice';
const isNameTaken = ({ contacts, name }) => {
  return contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const handleSubmit = event => {
    event.preventDefault();
    const {
      name: { value: nameValue },
      number: { value: numberValue },
    } = event.target.elements;
    if (isNameTaken({ contacts, name: nameValue })) {
      dispatch(setMessage(`${nameValue} is already exist`));
      return;
    }
    dispatch(addContact({ name: nameValue, phone: numberValue }));
    event.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Name</h3>
      <Input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <h3>Number</h3>
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <ContactFormBtn type="submit">Add contact</ContactFormBtn>
    </Form>
  );
};

export default ContactForm;
