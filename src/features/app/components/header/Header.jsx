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
/* nodecosmos */
import NodeIndexToolbar from '../../../nodes/components/NodeIndexToolbar';
import UserDropdown from './UserDropdown';

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
    <Box display="flex" alignItems="center" height={62}>
      {subtitle && (
        <Box width={300} height={1}>
          <Box
            height={1}
            width={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography align="center" variant="body2">
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
        height={1}
        width={`calc(100% - ${subtitle ? 300 : 0}px)`}
      >
        <Grid item sm={4} align="left" pl={2}>
          <Button
            component={Link}
            to="/n"
            className="MicroButton"
          >
            <img src="/logo_1.svg" alt="logo" height={22} width={22} />
            <Typography sx={{ fontSize: 18, ml: 1 }} fontWeight="bold">
              <Box component="span" color="logo.blue">node</Box>
              <Box component="span" color="logo.red">cosmos</Box>
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
