import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { useColorMode } from './hooks/useColorMode';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import ColdStorageDashboard from './pages/ColdStorageDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import LogisticsDashboard from './pages/LogisticsDashboard';
import FarmerDashboard from './pages/FarmerDashboard';

function App() {
  const { mode, toggleColorMode } = useColorMode();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#7c3aed',
        light: '#8b5cf6',
        dark: '#6d28d9',
      },
      error: {
        main: '#dc2626',
        light: '#ef4444',
        dark: '#b91c1c',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: mode === 'light' ? '#1e293b' : '#f8fafc',
        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: mode === 'light' 
              ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
              : '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '0.5rem',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
          },
          standardError: {
            backgroundColor: mode === 'light' ? '#fef2f2' : '#450a0a',
            color: mode === 'light' ? '#991b1b' : '#fca5a5',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage onToggleTheme={toggleColorMode} />} />
          <Route path="/admin" element={<AdminDashboard onToggleTheme={toggleColorMode} />} />
          <Route path="/cold-storage" element={<ColdStorageDashboard onToggleTheme={toggleColorMode} />} />
          <Route path="/buyer" element={<BuyerDashboard onToggleTheme={toggleColorMode} />} />
          <Route path="/logistics" element={<LogisticsDashboard onToggleTheme={toggleColorMode} />} />
          <Route path="/farmer" element={<FarmerDashboard onToggleTheme={toggleColorMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;