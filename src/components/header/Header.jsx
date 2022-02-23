import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* mui */
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import TagRounded from '@mui/icons-material/TagRounded';
import MicronIndexToolbar from '../microns/index/MicronIndexToolbar';
import MicronToolbar from '../microns/show/MicronToolbar';
/* micro */
import UserDropdown from './UserDropdown';

const toolbars = {
  MicronIndexToolbar: <MicronIndexToolbar />,
  MicronShowToolbar: <MicronToolbar />,
};

function Header(props) {
  const { toolbar, subtitle } = props;

  return (
    <Box className="Header" display="flex" alignItems="center" height={45}>
      <Box className="BoxShadowBottom" width={300} height={1}>
        <Box
          height={1}
          width={1}
          className="BoxShadowRight BorderRight BorderBottom"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography align="center" variant="body2" color="black5">
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Grid
        ml="0.5px"
        mr="-0.5px"
        container
        alignItems="center"
        justifyContent="center"
        className="BoxShadowBottom BorderBottom"
        height={45}
        width="calc(100% - 300px)"
      >
        <Grid item xs={12} sm={4} align="left" pl={2}>
          <Button
            component={Link}
            to="/"
            color="primary"
            className="MicroButton"
            startIcon={<TagRounded sx={{ color: 'primary.light', ml: 0, mr: -2 }} />}
          >
            <Typography variant="body1" fontWeight="bold">
              <Box component="span" color="primary.light">micro</Box>
              <Box component="span" color="secondary.main">cosmos</Box>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} align="center">
          {toolbars[toolbar]}
        </Grid>
        <Grid item xs={12} sm={4} align="right">
          <Box pr={2}>
            <UserDropdown />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

Header.defaultProps = {
  toolbar: null,
  subtitle: null,
};

Header.propTypes = {
  toolbar: PropTypes.node,
  subtitle: PropTypes.node,
};

function mapStateToProps(state) {
  const { currentToolbar, subtitle } = state.app;
  return { toolbar: currentToolbar, subtitle };
}

export default connect(mapStateToProps)(Header);
