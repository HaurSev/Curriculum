import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(92, 95, 100, 1)',
      light: '#e7e7e9ff',
      dark: 'rgb(59, 61, 65)',
    },
    secondary: {
      main: 'rgba(168, 0, 0, 1)',
      light: 'rgba(210, 2, 2, 1)',
      dark: 'rgba(168, 0, 0, 1)',
    },
    background: { default: 'rgb(59, 61, 65)', paper: 'rgba(59, 61, 65, 0.7)' },
    error: { main: 'rgba(168, 0, 0, 1)' },
    text: { primary: '#fff', secondary: '#b0b0b0ff' },
  },
  typography: {
    fontFamily: ['Arial', 'Helvetica', 'sans-serif'].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: '15px',
      letterSpacing: '1px',
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 25,
          padding: '8px 16px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          minWidth: '200px',
          height: '45px',
          fontSize: '15px',
          letterSpacing: '1px',
          border: 'none',
          transition: 'background 0.4s ease',
          '&:hover': {
            ...(ownerState.variant === 'contained' && {
              background: 'rgb(191, 1, 1)',
            }),
          },
          ...(ownerState.variant === 'contained' && {
            background: 'var(--active-color, rgba(168, 0, 0, 1))',
            color: 'var(--def-text-color, #fff)',
            '&:hover': { background: 'rgb(191, 1, 1)' },
          }),
          ...(ownerState.variant === 'outlined' && {
            background: 'transparent',
            color: 'grey',
            border: 'none',
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            background: 'transparent',
            color: 'grey',
            border: '1px solid grey',
            transition: 'background 0.4s ease, border 0.4s ease',
            '&:hover': { background: 'rgba(75, 75, 75, 0.413)' },
            '&.Mui-focused': {
              border:
                '2px solid var(--active-color, rgba(168, 0, 0, 1)) !important',
              color: 'white',
            },
            '& .MuiOutlinedInput-input': { padding: '10px', color: 'inherit' },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.authForm': {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '600px',
            gap: '20px',
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px',
            },
          },
        },
      },
    },
  },
});
export const globalStyles = {
  ':root': {
    '--active-color': 'rgba(168, 0, 0, 1)',
    '--def-text-color': '#fff',
  },
};

export default theme;
