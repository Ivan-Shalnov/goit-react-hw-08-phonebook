import React from 'react';
import { nanoid } from 'nanoid';

import { Container, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
    error: null,
  };
  static LOCAL_STORAGE_KEY = 'contacts';
  componentDidMount() {
    try {
      const savedContacts = JSON.parse(
        localStorage.getItem(this.constructor.LOCAL_STORAGE_KEY)
      );
      if (savedContacts) this.setState({ contacts: savedContacts });
    } catch {
      this.setState(
        { error: 'Cant read contacts from storage, storage will be cleared' },
        () => {
          setTimeout(this.handleStorageError, 3000);
        }
      );
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.saveContactsToStorage();
    }
  }
  updateFilter = newFilter => this.setState({ filter: newFilter });

  visibleContacts = () => {
    const filteredContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
    return filteredContacts;
  };
  handleStorageError = () => {
    localStorage.removeItem(this.constructor.LOCAL_STORAGE_KEY);
    this.setState({ error: null });
  };
  saveContactsToStorage() {
    localStorage.setItem(
      this.constructor.LOCAL_STORAGE_KEY,
      JSON.stringify(this.state.contacts)
    );
  }
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
          {(() => {
            if (this.state.error) return this.state.error;
            return this.state.contacts.length !== 0 ? (
              <div>
                <Filter updateFilter={updateFilter} inputValue={filter} />
                <ContactList
                  contacts={visibleContacts()}
                  deleteContact={deleteContact}
                />
              </div>
            ) : (
              'Contact list is empty'
            );
          })()}
        </div>
      </Container>
    );
  }
}
