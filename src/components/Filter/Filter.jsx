import { Title, FilterInput } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);
  const filterChange = e => dispatch(setFilter(e.target.value));
  return (
    <>
      <Title>Filter contacts by name</Title>
      <FilterInput
        type="text"
        value={filterValue}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={filterChange}
      />
    </>
  );
};

export default Filter;
