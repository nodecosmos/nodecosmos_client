import React from 'react';
import Box from '@mui/material/Box';
import {
  BrowserRouter,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
/* mui */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from '../../../pages/home/Index';
// /* users */
// import UserAuthentication from '../../../pages/users/Authentication';
// /* nodes */
// import NodesIndex from '../../../pages/nodes/Index';
// import NodeShow from '../../../pages/nodes/Show';
// import useUserAuthentication from '../../authentication/hooks/useUserAuthentication';
/* nodecosmos */
import history from '../../../history';
import getTheme from '../../../themes/theme';
import dark from '../../../themes/dark';
import light from '../../../themes/light';
import Header from './header/Header';

/* css */
import './App.css';

export default function App() {
  const theme = useSelector((state) => state.app.theme);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const currentUser = useSelector((state) => state.auth.currentUser);

  const themes = { light, dark };
  const currentTheme = themes[theme];

  // const { syncUpCurrentUser } = useUserAuthentication();
  //
  // useEffect(() => {
  //   if (isAuthenticated) syncUpCurrentUser();
  // }, [isAuthenticated, syncUpCurrentUser]);

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
            borderRadius={{
              xs: 0,
              sm: 1.5,
            }}
            height={1}
            width={1}
            backgroundColor="background.2"
            boxShadow="8"
          >
            <Header />
            <Routes>
              <Route path="/" element={(<Home />)} />
              {/* <Route path="/n" element={(<NodesIndex />)} /> */}
              {/* <Route */}
              {/*   path="/login" */}
              {/*   element={isAuthenticated */}
              {/*     ? <Navigate to={`/users/${currentUser.username}`} /> */}
              {/*     : <UserAuthentication />} */}
              {/* /> */}
              {/* <Route path="/home" element={<Home />} /> */}
              {/* <Route path="/nodes/:id/*" element={<NodeShow />} /> */}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
