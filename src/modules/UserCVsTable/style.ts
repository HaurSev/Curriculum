import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  styled,
  TableContainer,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const StyledTableContainer = styled(TableContainer)(() => ({
  background: 'transparent',
  elevation: 0,
}));

export const StyledTable = styled(Table)(() => ({
  minWidth: 650,
}));

export const StyledTableHead = styled(TableHead)(() => ({
  height: 60,
  textTransform: 'capitalize',
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '& td, & th': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(107,36,36,0.08)',
    cursor: 'pointer',
  },
}));

export const DescriptionTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
}));

export const DescriptionTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.disabled,
  textAlign: 'justify',
}));

export const ActionTableCell = styled(TableCell)(() => ({
  cursor: 'pointer',
  align: 'left',
}));

export const MoreIcon = styled(MoreVertIcon)(() => ({}));

export const SortableTableCell = styled(TableCell)(() => ({
  align: 'left',
}));
