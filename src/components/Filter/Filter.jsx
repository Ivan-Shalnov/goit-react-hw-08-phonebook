import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/filter/selectors';
import { setFilter } from 'redux/filter/slice';
import SearchIcon from '@mui/icons-material/Search';
import { StyledInputBase, Search, SearchIconWrapper } from './Filter.styled';
const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);
  const filterChange = e => dispatch(setFilter(e.target.value));
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={filterValue}
        onChange={filterChange}
        placeholder="Search by name…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default Filter;
