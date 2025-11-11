import React from 'react';
import type { SearchProps } from './type';
import { SearchContainer, SearchIconWrapper, StyledInputBase } from './style';
import SearchIcon from '@mui/icons-material/Search';

const Search: React.FC<SearchProps> = ({ searchValue, onChange }) => {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={onChange}
      />
    </SearchContainer>
  );
};

export default Search;
