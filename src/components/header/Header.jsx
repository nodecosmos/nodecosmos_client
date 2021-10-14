import React from 'react';
import { Link } from 'react-router-dom';
/* material ui */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MicroAnimate from '../microcosmos/MicroAnimate';
/* micro */
import UserDropdown from './UserDropdown';

function Header() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4} align="left">
        <Button component={Link} to="/" color="primary" className="MicroButton">
          <MicroAnimate>
            <Typography variant="body1">
              <Box component="span" color="primary.main">#micro</Box>
              <Box component="span" color="secondary.main">cosmos</Box>
            </Typography>
          </MicroAnimate>
        </Button>
      </Grid>
      <Grid item xs={6} md={4} align="center">
        <Typography variant="h6" color="primary">
          <Box color="secondary.main" component="span">~</Box>
          System Modeling
          <Box color="secondary.main" component="span">~</Box>
        </Typography>
      </Grid>
      <Grid item xs={2} md={4} align="right">
        <UserDropdown />
      </Grid>
    </Grid>
  );
}

export default Header;
