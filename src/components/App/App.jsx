import React from 'react';

import { Container, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <div>
        <h2>Contacts</h2>
        {(() => {
          if (contacts.length > 0) {
            return (
              <div>
                <Filter />
                <ContactList />
              </div>
            );
          } else {
            return 'Contact list is empty';
          }
        })()}
      </div>
    </Container>
  );
};
