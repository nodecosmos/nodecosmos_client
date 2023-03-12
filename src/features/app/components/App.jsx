import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
/* nodecosmos */
import Home from '../../../pages/home/Index';
import dark from '../../../themes/dark';
import light from '../../../themes/light';
import getTheme from '../../../themes/theme';
import Loader from '../../../common/components/Loader';
/* sx */

const LazyAppLoad = React.lazy(() => import('./LazyAppLoad'));

export default function App() {
  const theme = useSelector((state) => state.app.theme);

  const themes = {
    light,
    dark,
  };
  const currentTheme = themes[theme];
  const location = useLocation();

  const isHomepage = location.pathname === '/';
  /**
   *
   * @type {boolean}
   * @description
   * Prevents the app from loading on homepage
   */
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isHomepage && isDevelopment) {
    return (
      <Suspense fallback={(
        <Loader
          backgroundColor={currentTheme.palette.background.paper}
          color={currentTheme.palette.primary.main}
        />
      )}
      >
        <LazyAppLoad />
      </Suspense>
    );
  }

  // only homepage
  return (
    <ThemeProvider theme={getTheme(dark)}>
      <CssBaseline />
      <Box
        height={1}
        width={1}
        p={{
          xs: 0,
          sm: 0.75,
        }}
        backgroundColor="background.1"
      >
        <Box
          height={1}
          width={1}
          boxShadow="8"
          backgroundColor="background.2"
          border={1}
          borderColor="borders.2"
          borderRadius={{
            xs: 0,
            sm: 2,
          }}
        >
          <Routes>
            <Route path="/" element={(<Home />)} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
