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
import NodeIndexToolbar from '../nodes/components/NodeIndexToolbar';
import NodeToolbar from '../nodes/components/NodeToolbar';
/* nodecosmos */
import UserDropdown from './UserDropdown';

const toolbars = {
  NodeIndexToolbar: <NodeIndexToolbar />,
  NodeShowToolbar: <NodeToolbar />,
};

function Header(props) {
  const { toolbar, subtitle } = props;

  return (
    <Box className="Header" display="flex" alignItems="center" height={62}>
      {subtitle && (
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
      )}
      <Grid
        ml="0.5px"
        mr="-0.5px"
        container
        alignItems="center"
        justifyContent="center"
        className="BoxShadowBottom BorderBottom"
        height={1}
        width={`calc(100% - ${subtitle ? 300 : 0}px)`}
      >
        <Grid item sm={4} align="left" pl={2}>
          <Button
            component={Link}
            to="/"
            color="primary"
            className="MicroButton"
            startIcon={<TagRounded sx={{ color: 'primary.light', ml: 0, mr: -2 }} />}
          >
            <Typography sx={{ fontSize: '1.05rem' }} fontWeight="bold">
              <Box component="span" color="primary.light">node</Box>
              <Box component="span" color="secondary.main">cosmos</Box>
            </Typography>
          </Button>
        </Grid>
        <Grid item sm={4} align="center">
          {toolbars[toolbar]}
        </Grid>
        <Grid item sm={4} align="right">
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
