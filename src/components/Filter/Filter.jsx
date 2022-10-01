import PropTypes from 'prop-types';
import { Title, FilterInput } from './Filter.styled';
const Filter = ({ inputValue, changeHandler }) => {
  return (
    <>
      <Title>Filter contacts by name</Title>
      <FilterInput
        type="text"
        value={inputValue}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={changeHandler}
      />
    </>
  );
};
Filter.propTypes = {
  inputValue: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
};
export default Filter;
