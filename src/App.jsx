import React, { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from '@mui/material';
import { AccountBalance, Home, Info } from '@mui/icons-material';
import theme from "./theme/theme";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Footer from "./components/common/Footer";

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AccountBalance />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 1 }}>
              EXPENSE<span style={{ color: '#34D399' }}>TRACKER</span>
            </Typography>
            <Button
              color="inherit"
              startIcon={<Home />}
              onClick={() => setCurrentView('home')}
              sx={{
                bgcolor: currentView === 'home' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                color: currentView === 'home' ? 'primary.main' : 'inherit',
                mr: 1,
                '&:hover': { bgcolor: 'rgba(5, 150, 105, 0.05)' }
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<Info />}
              onClick={() => setCurrentView('about')}
              sx={{
                bgcolor: currentView === 'about' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                color: currentView === 'about' ? 'primary.main' : 'inherit',
                '&:hover': { bgcolor: 'rgba(5, 150, 105, 0.05)' }
              }}
            >
              About
            </Button>
          </Toolbar>
        </AppBar>

        {currentView === 'home' ? (
          <Dashboard />
        ) : (
          <About />
        )}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
