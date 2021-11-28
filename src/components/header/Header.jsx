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
/* micro */
import UserDropdown from './UserDropdown';

function Header(props) {
  const { toolbar, subtitle } = props;

  return (
    <Grid container alignItems="center" className="HeaderHeight">
      <Grid
        item
        xs={2}
        className="BoxShadowBottom BorderBottom"
        height={1}
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Typography align="center" variant="h5">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs={10} height={1} display="flex" justifyContent="center" className="BoxShadowBottom BorderBottom">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={4} align="left" pl={2}>
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
            <Box pr={2}>
              <UserDropdown />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
