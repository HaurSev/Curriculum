import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  styled,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

export const StyledTableRow = styled(TableRow)(() => ({}));

export const ActionTableCell = styled(TableCell)(() => ({
  cursor: 'pointer',
}));

export const MoreIcon = styled(MoreVertIcon)(() => ({}));
