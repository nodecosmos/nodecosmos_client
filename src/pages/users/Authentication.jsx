import React, { useState } from 'react';

/* mui */
import {
  Tab,
  Tabs,
  Box,
  Container, Typography,
} from '@mui/material';
/* nodecosmos */
import LoginForm from '../../features/authentication/components/LoginForm';
import SignupForm from '../../features/authentication/components/SignupForm';

export default function Authentication() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ height: 600, width: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="logo_1.svg" alt="logo" height={50} width={50} />
          <Typography sx={{ fontSize: 50, ml: 2 }} fontWeight="bold">
            <Box component="span" color="logo.blue">node</Box>
            <Box component="span" color="logo.red">cosmos</Box>
          </Typography>
        </Box>
        <Box mt={4}>
          <Tabs value={currentPage} onChange={(_event, value) => setCurrentPage(value)} centered>
            <Tab label="Log in" disableRipple />
            <Tab label="Sign up" disableRipple />
          </Tabs>
        </Box>
        <Box textAlign="center" mt={3}>
          {currentPage === 0 ? <LoginForm /> : <SignupForm />}
        </Box>
      </Box>
    </Container>
  );
}
