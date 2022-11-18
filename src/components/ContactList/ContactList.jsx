import { Button } from 'components/common.styled';
import { List, Item, Name, Phone } from './ContactList.styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
const getVisibleContacts = ({ contacts, filter }) => {
  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
};
const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts({ contacts, filter });
  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <Item key={id}>
          <div>
            <Name>{name}</Name>
            <Phone>{number.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')}</Phone>
          </div>
          <Button onClick={() => dispatch(deleteContact(id))}>Delete</Button>
        </Item>
      ))}
    </List>
  );
};

export default ContactList;
