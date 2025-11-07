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
    background: {
      default: 'rgba(52, 52, 52, 1)',
      paper: 'rgba(59, 61, 65, 0.7)',
    },
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
    h2: { fontSize: '2rem', fontWeight: 600, textTransform: 'capitalize' },
    h3: { fontSize: '1.75rem', fontWeight: 500, textTransform: 'capitalize' },
    h4: { fontSize: '1.5rem', fontWeight: 500, textTransform: 'capitalize' },
    h5: { fontSize: '1.25rem', fontWeight: 500, textTransform: 'capitalize' },
    h6: { fontSize: '1rem', fontWeight: 500, textTransform: 'capitalize' },
    body1: { fontSize: '1rem', lineHeight: 1.5, textTransform: 'capitalize' },
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
          gap: theme.spacing(3),
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
            border: `1px solid ${theme.palette.text.disabled}`,
            '&:hover': {
              background: 'rgba(128, 128, 128, 0.144)',
              transition: '0.6s ease',
              cursor: 'pointer',
              border: `1px solid ${theme.palette.text.primary}`,
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
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.text.primary}`,
            transition: 'background 0.4s ease, border 0.4s ease',

            '&:hover': {
              background: 'rgba(75, 75, 75, 0.413)',
            },

            '&.Mui-focused': {
              border: `2px solid ${theme.palette.text.secondary}`,
              color: theme.palette.text.primary,
            },

            '&.Mui-disabled': {
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${theme.palette.text.disabled}`,
              color: theme.palette.text.disabled,
              cursor: 'not-allowed',
              '& .MuiOutlinedInput-input': {
                color: theme.palette.text.disabled,
              },
            },

            '& .MuiOutlinedInput-input': {
              padding: '10px',
              color: 'inherit',
            },
          },

          '& .MuiInputLabel-root': {
            color: theme.palette.text.disabled,
            '&.Mui-focused': {
              color: theme.palette.text.primary,
              background: theme.palette.background,
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled,
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
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          opacity: 1,
          '&.authForm': {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            width: '600px',
            gap: '20px',
            background: 'transparent',
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px',
            },
          },
        }),
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
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.disabled,
          width: '220px',
          border: 'none',
          background: 'transparent',
          fontSize: '18px',
          padding: '15px 10px 15px 20px',
          borderTopRightRadius: 35,
          borderBottomRightRadius: 35,
          textTransform: 'capitalize',
          '&:hover': {
            background: 'rgba(44, 43, 43, 0.45)',
            transition: '0.4s ease',
            cursor: 'pointer',
          },
          '&:active': {
            background: 'rgba(91, 91, 91, 0.144)',
            transition: '0.4s ease',
          },
          '&.active': {
            color: theme.palette.text.primary,
            background: theme.palette.primary.main,
            '&:hover': {
              background: 'rgba(107, 36, 36, 0.31)',
              transition: '0.4s ease',
              cursor: 'pointer',
            },
            '&:active': {
              background: 'rgba(163, 161, 161, 0.14)',
              transition: '0.4s ease',
            },
          },
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.primary.main,
          color: theme.palette.text.disabled,
          width: '140px',
          height: '140px',
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 5,
          width: '100px',
          backgroundColor: theme.palette.grey[800],
          '&.novice .MuiLinearProgress-bar': {
            backgroundColor: '#2127a5ff',
          },
          '&.advanced .MuiLinearProgress-bar': {
            backgroundColor: '#3893c1ff',
          },
          '&.competent .MuiLinearProgress-bar': {
            backgroundColor: '#88d926ff',
          },
          '&.proficient .MuiLinearProgress-bar': {
            backgroundColor: '#d6a124ff',
          },
          '&.expert .MuiLinearProgress-bar': {
            backgroundColor: '#F44336',
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
