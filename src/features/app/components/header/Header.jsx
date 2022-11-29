import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
/* mui */
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
/* icons */
import TagRounded from '@mui/icons-material/TagRounded';
/* nodecosmos */
import UserDropdown from './UserDropdown';
import NodeIndexToolbar from '../../../nodes/components/NodeIndexToolbar';

const NON_HEADER_PATHS = ['/login', '/'];

export default function Header() {
  const toolbars = {
    NodeIndexToolbar: <NodeIndexToolbar />,
    // NodeShowToolbar: <NodeToolbar />,
  };

  const location = useLocation();

  const toolbar = useSelector((state) => state.app.currentToolbar);
  const subtitle = useSelector((state) => state.app.subtitle);

  if (NON_HEADER_PATHS.includes(location.pathname)) return null;

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
        width={`calc(100% - ${subtitle ? 300 : 0}px)`} // TODO: update check safari
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
