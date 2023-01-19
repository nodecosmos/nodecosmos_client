import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* nodecosmos */
import history from '../../../history';
import Home from '../../../pages/home/Index';
import dark from '../../../themes/dark';
import light from '../../../themes/light';
import getTheme from '../../../themes/theme';

/* css */
import './App.css';
// import Loader from './common/Loader';
//
// const LazyAppLoad = React.lazy(() => import('./LazyAppLoad'));

export default function App() {
  const theme = useSelector((state) => state.app.theme);

  const themes = {
    light,
    dark,
  };
  const currentTheme = themes[theme];

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
      <CssBaseline />
      <BrowserRouter location={history.location} navigator={history}>
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
            {/* { */}
            {/*   history.location.pathname !== '/' && ( */}
            {/*   <Suspense fallback={<Loader />}> */}
            {/*     <LazyAppLoad /> */}
            {/*   </Suspense> */}
            {/*   ) */}
            {/* } */}
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
