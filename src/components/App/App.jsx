import React from 'react';
import { nanoid } from 'nanoid';

import { Container, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '4591256' },
      { id: 'id-2', name: 'Hermione Kline', number: '4438912' },
      { id: 'id-3', name: 'Eden Clements', number: '6451779' },
      { id: 'id-4', name: 'Annie Copeland', number: '2279126' },
    ],
    filter: '',
  };

  updateFilter = newFilter => this.setState({ filter: newFilter });

  visibleContacts = () => {
    const filteredContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
    return filteredContacts;
  };
  addContact = ({ name, number }) => {
    if (this.isNameTaken(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    this.setState(() => ({ contacts: [...this.state.contacts, newContact] }));
    return true;
  };
  isNameTaken(nameToCheck) {
    nameToCheck = nameToCheck.toLowerCase();
    return this.state.contacts.some(
      ({ name }) => name.toLocaleLowerCase() === nameToCheck
    );
  }
  deleteContact = idToDelete => {
    const updatedContacts = this.state.contacts.filter(
      ({ id }) => id !== idToDelete
    );
    this.setState({ contacts: updatedContacts });
  };
  render() {
    const { filter } = this.state;
    const { addContact, updateFilter, visibleContacts, deleteContact } = this;
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm addContact={addContact} />
        <div>
          <h2>Contacts</h2>
          <Filter updateFilter={updateFilter} inputValue={filter} />
          <ContactList
            contacts={visibleContacts()}
            deleteContact={deleteContact}
          />
        </div>
      </Container>
    );
  }
}
