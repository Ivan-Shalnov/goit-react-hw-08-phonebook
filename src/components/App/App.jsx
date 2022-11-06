import React from 'react';
import { nanoid } from 'nanoid';

import { Container, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { useState } from 'react';
import { useEffect } from 'react';
const LOCAL_STORAGE_KEY = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  // Get contacts from storage on mount
  useEffect(() => {
    console.log('Get from storage');
    try {
      const savedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (savedContacts) setContacts(savedContacts);
    } catch {
      setError(() => {
        setTimeout(() => setError(null), 3000);
        return 'Cant read contacts from storage, storage will be cleared';
      });
    }
  }, []);

  // Save contacts to storage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  const updateFilter = newFilter => setFilter(newFilter);
  const visibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );
  const isNameTaken = nameToCheck =>
    contacts.some(
      ({ name }) => name.toLowerCase() === nameToCheck.toLowerCase()
    );

  const addContact = ({ name, number }) => {
    if (isNameTaken(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
    return true;
  };
  const deleteContact = idToDelete => {
    const updatedContacts = contacts.filter(({ id }) => id !== idToDelete);
    setContacts(updatedContacts);
  };
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm addContact={addContact} />
      <div>
        <h2>Contacts</h2>
        {(() => {
          if (error) return error;
          if (contacts.length !== 0) {
            return (
              <div>
                <Filter updateFilter={updateFilter} inputValue={filter} />
                <ContactList
                  contacts={visibleContacts}
                  deleteContact={deleteContact}
                />
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
