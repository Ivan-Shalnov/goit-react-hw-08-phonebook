import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { Input } from 'components/common.styled';
import { ContactFormBtn, Form } from './ContactForm.styled';
class ContactForm extends React.Component {
  handleSubmit = event => {
    const {
      name: { value: nameValue },
      number: { value: numberValue },
    } = event.target.elements;
    if (this.isNameTaken(nameValue)) {
      alert(`${nameValue} is already in contacts`);
      return;
    }
    event.preventDefault();
    this.addContact(nameValue, numberValue);
    event.target.reset();
  };
  isNameTaken(nameToCheck) {
    nameToCheck = nameToCheck.toLowerCase();
    return this.props.contacts.some(
      ({ name }) => name.toLocaleLowerCase() === nameToCheck
    );
  }
  addContact(name, number) {
    const newContact = { id: nanoid(), name, number };
    const updatedContacts = [...this.props.contacts, newContact];
    this.props.updateContacts(updatedContacts);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
  }
}
ContactForm.propTypes = {
  updateContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactForm;
