import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
/* mui */
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import TagRounded from '@mui/icons-material/TagRounded';
/* micro */
import Toolbar from '../microns/Toolbar';
import UserDropdown from './UserDropdown';

function Header(props) {
  const microns = useSelector((state) => state.microns);
  const { id } = useParams();
  const currentMicron = microns[id];
  const { showToolbar } = props;

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
          {showToolbar && <Toolbar />}
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

Header.defaultProps = {
  showToolbar: false,
};

Header.propTypes = {
  showToolbar: PropTypes.bool,
};

export default Header;
