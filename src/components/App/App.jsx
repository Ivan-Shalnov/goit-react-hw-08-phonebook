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
    name: '',
    number: '',
  };
  handleSubmit = event => {
    event.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = event.target.elements;
    if (!this.isNameTaken(name)) {
      this.addContact(name, number);
      event.target.reset();
    } else {
      alert(`${name} is already in contacts`);
    }
  };
  isNameTaken(nameToCheck) {
    nameToCheck = nameToCheck.toLowerCase();
    return this.state.contacts.some(
      ({ name }) => name.toLocaleLowerCase() === nameToCheck
    );
  }
  addContact(name, number) {
    this.setState(() => {
      return {
        contacts: [...this.state.contacts, { id: nanoid(), name, number }],
      };
    });
  }
  deleteContact = idToDelete => {
    const updatedContacts = this.state.contacts.filter(
      ({ id }) => id !== idToDelete
    );
    this.setState({ contacts: updatedContacts });
  };
  filterChange = event => {
    this.setState({ filter: event.target.value });
  };
  render() {
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm handler={this.handleSubmit} />
        <div>
          <h2>Contacts</h2>
          <Filter
            inputValue={this.state.filter}
            changeHandler={this.filterChange}
          />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            handleDelete={this.deleteContact}
          />
        </div>
      </Container>
    );
  }
}
