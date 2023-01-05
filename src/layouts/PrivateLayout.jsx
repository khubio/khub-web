import { useState } from 'react';
import Topbar from '@layouts/components/Topbar';
import Sidebar from '@layouts/components/Sidebar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useLocation, Navigate } from 'react-router-dom';
import { ColorModeContext, useMode } from '../theme';

function PrivateLayout({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  if (localStorage.getItem('profile')) {
    if (location.pathname === '/auth/login') {
      return <Navigate to="/" />;
    }
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  if (location.pathname === '/auth/login') {
    return children;
  }
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
}

export default PrivateLayout;
