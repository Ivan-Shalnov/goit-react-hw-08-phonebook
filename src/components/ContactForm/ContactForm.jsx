import PropTypes from 'prop-types';
import { Input } from 'components/common.styled';
import { ContactFormBtn, Form } from './ContactForm.styled';
const ContactForm = ({ handler }) => {
  return (
    <Form onSubmit={handler}>
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
};
ContactForm.propTypes = {
  handler: PropTypes.func.isRequired,
};
export default ContactForm;
