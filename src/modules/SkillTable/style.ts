import { TableContainer, TableHead, TableCell, styled } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  padding: theme.spacing(5),
}));

export const StyledTableHead = styled(TableHead)(() => ({
  height: 60,
  textTransform: 'capitalize',
}));

export const SortableTableCell = styled(TableCell)(() => ({
  cursor: 'pointer !important',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const ActionTableCell = styled(TableCell)(() => ({
  cursor: 'pointer',
}));
