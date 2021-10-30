import TagRounded from '@mui/icons-material/TagRounded';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
/* material ui */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
/* micro */
import UserDropdown from './UserDropdown';

function Header() {
  const microns = useSelector((state) => state.microns);
  const { id } = useParams();
  const currentMicron = microns[id];

  return (
    <Box className="BoxShadowBottom" padding={2} height={54}>
      <Grid container alignItems="center">
        <Grid item xs={4} align="left">
          <Button
            component={Link}
            to="/"
            color="primary"
            className="MicroButton"
            startIcon={<TagRounded sx={{ color: 'primary.light', ml: 0, mr: -2 }} />}
          >
            <Typography variant="body1">
              <Box component="span" color="primary.light">micro</Box>
              <Box component="span" color="secondary.main">cosmos</Box>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4} align="center">
          {currentMicron && currentMicron.title}
        </Grid>
        <Grid item xs={4} align="right">
          <Box mr={2}>
            <UserDropdown />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
