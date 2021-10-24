import Grid from '@mui/material/Grid';
import React from 'react';
import { Link } from 'react-router-dom';

/* material ui */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/* micro */
import UserDropdown from './UserDropdown';
import MicroAnimate from '../microcosmos/MicroAnimate';

function Header() {
  return (
    <Box className="BoxShadowBottom" padding={2}>
      <Grid container alignItems="center">
        <Grid item xs={6} align="left">
          <Button component={Link} to="/" color="primary" className="MicroButton">
            <MicroAnimate>
              <Typography variant="body1">
                <Box component="span" color="primary.light">#micro</Box>
                <Box component="span" color="secondary.main">cosmos</Box>
              </Typography>
            </MicroAnimate>
          </Button>
        </Grid>
        <Grid item xs={6} align="right">
          <Box mr={2}>
            <UserDropdown />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
