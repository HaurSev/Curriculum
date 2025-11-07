import {
  styled,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import theme from '../../theme/theme';

export const CustomTableContainer = styled(TableContainer)(() => ({
  background: 'transparent',
}));

export const CustomTable = styled(Table)(() => ({
  minWidth: 650,
  ariaLabel: 'sortable table',
}));

export const CustomTableHead = styled(TableHead)(() => ({
  height: 60,
  textTransform: 'capitalize',
}));

export const CustomTableCell = styled(TableCell)(() => ({
  textAlign: 'left',
}));

export const CustomTableRow = styled(TableRow)(() => ({
  '& td, & th': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(107,36,36,0.08)',
    cursor: 'pointer',
  },
}));

export const TableCellDescrition = styled(TableCell)(() => ({
  color: theme.palette.text.disabled,
  textAlign: 'justify',
}));
