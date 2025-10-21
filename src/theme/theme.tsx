import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(92, 95, 100, 1)',
      light: '#e7e7e9ff',
      dark: 'rgb(59, 61, 65)',
    },
    secondary: {
      main: 'rgba(185, 0, 0, 1)',
      light: 'rgba(210, 2, 2, 1)',
      dark: 'rgba(168, 0, 0, 1)',
    },
    background: { default: 'rgb(59, 61, 65)', paper: 'rgba(59, 61, 65, 0.7)' },
    error: { main: 'rgba(168, 0, 0, 1)' },
    text: {
      primary: '#fff',
      secondary: 'rgba(190, 0, 0, 1)',
      disabled: '#b0b0b0ff',
    },
  },
  typography: {
    fontFamily: ['Arial', 'Helvetica', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      textTransform: 'capitalize',
      fontWeight: 300,
    },
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
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
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
              background: theme.palette.secondary.main,
            }),
          },
          ...(ownerState.variant === 'contained' && {
            background: theme.palette.secondary.main,
            color: theme.palette.text.primary,
            '&:hover': { background: theme.palette.text.secondary },
          }),
          ...(ownerState.variant === 'outlined' && {
            background: 'transparent',
            color: theme.palette.text.disabled,
            border: 'none',
            '&:hover': {
              background: 'rgba(128, 128, 128, 0.144)',
              transition: '0.6s ease',
              cursor: 'pointer',
            },
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            background: 'transparent',
            color: theme.palette.text.disabled,
            border: `1px solid ${theme.palette.text.disabled}`,
            transition: 'background 0.4s ease, border 0.4s ease',
            '&:hover': { background: 'rgba(75, 75, 75, 0.413)' },
            '&.Mui-focused': {
              border: `2px solid ${theme.palette.text.secondary}`,
              color: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-input': { padding: '10px', color: 'inherit' },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.disabled,
            '&.Mui-focused': {
              color: theme.palette.text.primary,
            },
          },
          '& input::placeholder': {
            color: theme.palette.text.disabled,
            opacity: 1,
          },
        }),
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
    MuiButtonGroup: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.authHeader': {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            '& .MuiButton-root': {
              width: '200px',
              border: 'none',
              background: 'transparent',
              fontSize: '18px',
              textTransform: 'uppercase',
              padding: '15px 0px',
              color: theme.palette.text.primary,
              '&.active': {
                color: theme.palette.text.secondary,
                borderBottom: `2px solid ${theme.palette.text.secondary}`,
              },
              '&:hover': {
                background: 'rgba(44, 43, 43, 0.45)',
                transition: '0.4s ease',
                cursor: 'pointer',
              },
              '&:active': {
                background: 'rgba(91, 91, 91, 0.144)',
                transition: '0.4s ease',
              },
            },
          },
        }),
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
