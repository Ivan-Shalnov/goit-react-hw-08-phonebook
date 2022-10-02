import React from 'react';
import PropTypes from 'prop-types';
import { Title, FilterInput } from './Filter.styled';
class Filter extends React.Component {
  filterChange = event => {
    this.props.updateFilter(event.target.value.toLowerCase());
  };
  render() {
    const { inputValue } = this.props;
    const { filterChange } = this;
    return (
      <>
        <Title>Filter contacts by name</Title>
        <FilterInput
          type="text"
          value={inputValue}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={filterChange}
        />
      </>
    );
  }
}
Filter.propTypes = {
  inputValue: PropTypes.string,
  updateFilter: PropTypes.func.isRequired,
};
export default Filter;
