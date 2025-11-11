import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  Avatar,
  Button,
  styled,
  TableSortLabel,
  TableContainer,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const StyledTableContainer = styled(TableContainer)(() => ({
  background: 'transparent',
}));

export const StyledTable = styled(Table)(() => ({
  minWidth: 650,
}));

export const StyledTableHead = styled(TableHead)(() => ({
  height: 60,
  textTransform: 'capitalize',
}));

export const StyledTableRow = styled(TableRow)(() => ({}));

export const SortableTableCell = styled(TableCell)(() => ({
  align: 'left',
}));

export const SortLabel = styled(TableSortLabel)(() => ({
  fontWeight: 600,
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  bgcolor: theme.palette.primary.main,
  width: '50px',
  height: '50px',
  cursor: 'pointer',
}));

export const EmailTableCell = styled(TableCell)(() => ({
  textTransform: 'lowercase',
  align: 'left',
}));

export const ActionTableCell = styled(TableCell)(() => ({
  align: 'left',
  cursor: 'pointer',
}));

export const MoreIcon = styled(MoreVertIcon)(() => ({
  cursor: 'pointer',
}));

export const ArrowIcon = styled(ArrowForwardIosIcon)(() => ({
  cursor: 'pointer',
}));

export const LoadingButton = styled(Button)(() => ({
  variant: 'text',
}));
