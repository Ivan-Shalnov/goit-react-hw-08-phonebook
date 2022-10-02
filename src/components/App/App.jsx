import React from 'react';

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
  updateContacts = updatedContacts =>
    this.setState({ contacts: updatedContacts });
  updateFilter = newFilter => this.setState({ filter: newFilter });

  visibleContacts = () => {
    const filteredContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
    return filteredContacts;
  };

  render() {
    const { contacts, filter } = this.state;
    const { updateContacts, updateFilter, visibleContacts } = this;
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm updateContacts={updateContacts} contacts={contacts} />
        <div>
          <h2>Contacts</h2>
          <Filter updateFilter={updateFilter} inputValue={filter} />
          <ContactList
            visibleContacts={visibleContacts()}
            contacts={contacts}
            updateContacts={updateContacts}
          />
        </div>
      </Container>
    );
  }
}
