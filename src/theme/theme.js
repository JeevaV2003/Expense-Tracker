import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#059669', // Emerald 600
      light: '#34D399', // Emerald 400
      dark: '#047857', // Emerald 700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0D9488', // Teal 600
      light: '#2DD4BF', // Teal 400
      dark: '#0F766E', // Teal 700
      contrastText: '#ffffff',
    },
    background: {
      default: '#F0FDF4', // Emerald 50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#064E3B', // Emerald 900
      secondary: '#374151', // Gray 700
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
      color: '#064E3B',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: '#064E3B',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#064E3B',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#064E3B',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#064E3B',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 8,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 10px 30px -5px rgba(5, 150, 105, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px -5px rgba(5, 150, 105, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          fontSize: '0.95rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #047857 0%, #0F766E 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #0D9488 0%, #06B6D4 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0F766E 0%, #0891B2 100%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
          color: '#064E3B',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: 'rgba(16, 185, 129, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(16, 185, 129, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#059669',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            borderColor: 'rgba(16, 185, 129, 0.2)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(16, 185, 129, 0.4)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#059669',
            borderWidth: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
