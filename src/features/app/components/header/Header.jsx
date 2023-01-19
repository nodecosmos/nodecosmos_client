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
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../constants';
import UserDropdown from './UserDropdown';

const NON_HEADER_PATHS = ['/login'];

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
    <Box
      display="flex"
      alignItems="center"
      border={1}
      borderBottom={0}
      borderColor="borders.2"
      position="fixed"
      height={HEADER_HEIGHT}
      width={{
        xs: 1,
        sm: 'calc(100% - 12px)',
      }}
      top={{
        sm: 6,
        xs: 0,
      }}
      right={{
        sm: 6,
        xs: 0,
      }}
      backgroundColor="background.3"
      boxShadow="header"
      sx={{
        borderTopLeftRadius: {
          xs: 0,
          sm: 6,
        },
        borderTopRightRadius: {
          xs: 0,
          sm: 6,
        },
      }}
    >
      {subtitle && (
        <Box
          width={SIDEBAR_WIDTH}
          height={1}
          borderRight={1}
          borderColor="borders.box.md"
          boxShadow="boxBorder.right.md"
        >
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
        width={`calc(100% - ${subtitle ? SIDEBAR_WIDTH : 0}px)`}
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
