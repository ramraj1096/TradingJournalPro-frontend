import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './AppRoutes.tsx';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeProvider.tsx';

function RootComponent() {
  
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('light');

  useEffect(() => {
   
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setMode(storedTheme);
    }
  }, []); 

  return (
    <StrictMode>
      <Router>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
        <Toaster
          visibleToasts={1}
          position="top-right"
          theme={mode} 
          richColors
        />
      </Router>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<RootComponent />);
