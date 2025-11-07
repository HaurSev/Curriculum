import { Box, InputBase, styled } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(5),
  backgroundColor: 'transparent',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transition: '0.4s ease',
  },
  marginLeft: 0,

  width: '600px',
  height: theme.spacing(10),
  border: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '400px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface SearchProps {
  searchValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

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
