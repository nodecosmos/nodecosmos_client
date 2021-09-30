import React from 'react';
import { Link } from 'react-router-dom';
/* material ui */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MicroAnimate from '../micro/MicroAnimate';
/* micro */
import UserDropdown from './UserDropdown';

function Header() {
  return (
    <Grid item xs={12}>
      <Paper className="BorderTopRounded-6">
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
          <Grid item xs={12} />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Header;
