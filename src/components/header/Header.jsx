import React from 'react';
import { Link } from 'react-router-dom';
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
import UserDropdown from './UserDropdown';

function Header(props) {
  const { toolbar } = props;

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
          {toolbar}
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
  toolbar: null,
};

Header.propTypes = {
  toolbar: PropTypes.node,
};

export default Header;
