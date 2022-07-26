import TagRounded from '@mui/icons-material/TagRounded';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* mui */
import {
  Tab,
  Tabs,
  Box,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
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
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TagRounded sx={{ color: 'primary.light', fontSize: 35 }} />
          <Box fontSize={35} align="center">
            <Box component="span" color="primary.light"> node</Box>
            <Box component="span" color="secondary.main">cosmos</Box>
          </Box>
        </Box>
        <Box>
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
