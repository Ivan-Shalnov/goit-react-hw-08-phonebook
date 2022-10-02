import PropTypes from 'prop-types';
import { Button } from 'components/common.styled';
import { List, Item, Name, Phone } from './ContactList.styled';
import React from 'react';
class ContactList extends React.Component {
  deleteContact = idToDelete => {
    const updatedContacts = this.props.contacts.filter(
      ({ id }) => id !== idToDelete
    );
    this.props.updateContacts(updatedContacts);
  };
  render() {
    const { visibleContacts } = this.props;
    const { deleteContact } = this;
    return (
      <List>
        {visibleContacts.map(({ id, name, number }) => (
          <Item key={id}>
            <div>
              <Name>{name}</Name>
              <Phone>
                {number.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')}
              </Phone>
            </div>
            <Button onClick={() => deleteContact(id)}>Delete</Button>
          </Item>
        ))}
      </List>
    );
  }
}
ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  updateContacts: PropTypes.func.isRequired,
};
export default ContactList;
