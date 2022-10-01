import PropTypes from 'prop-types';
import { Button } from 'components/common.styled';
import { List, Item, Name, Phone } from './ContactList.styled';
const ContactList = ({ contacts, filter, handleDelete }) => {
  return (
    <List>
      {contacts
        .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(({ id, name, number }) => (
          <Item key={id}>
            <div>
              <Name>{name}</Name>
              <Phone>
                {number.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')}
              </Phone>
            </div>
            <Button onClick={() => handleDelete(id)}>Delete</Button>
          </Item>
        ))}
    </List>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default ContactList;
