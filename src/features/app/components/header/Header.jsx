import React from 'react';
import { faBell, faHashtag, faMessages } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* mui */
import {
  Box, Button, Tooltip, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import NodeBreadcrumbs from '../../../nodes/components/NodeBreadcrumbs';

/* nodecosmos */
import NodeIndexToolbar from '../../../nodes/components/NodeIndexToolbar';
import { selectHeaderContent, selectHeaderSubtitle } from '../../app.selectors';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../constants';
import UserDropdown from './UserDropdown';

const NON_HEADER_PATHS = ['/login'];

export default function Header() {
  const headerContents = {
    NodeIndexToolbar: <NodeIndexToolbar />,
    NodeBreadcrumbs: <NodeBreadcrumbs />,
  };

  const location = useLocation();

  const headerContent = useSelector(selectHeaderContent);
  const subtitle = useSelector(selectHeaderSubtitle);

  if (NON_HEADER_PATHS.includes(location.pathname)) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      position="fixed"
      height={HEADER_HEIGHT}
      width={{
        xs: 1,
        sm: 'calc(100% - 14px)',
      }}
      top={{
        sm: 7,
        xs: 0,
      }}
      right={{
        sm: 7,
        xs: 0,
      }}
      backgroundColor="background.2"
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
      zIndex={1}
    >
      {subtitle && (
        <Box
          width={SIDEBAR_WIDTH}
          height={1}
          borderRight={1}
          borderColor="borders.1"
        >
          <Box
            height={1}
            width={1}
            px={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            oveflow="hidden"
          >
            <FontAwesomeIcon icon={faHashtag} />
            <Typography
              align="center"
              variant="body1"
              ml={1}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={1}
        width={`calc(100% - ${subtitle ? SIDEBAR_WIDTH : 0}px)`}
        borderBottom={1}
        borderColor="borders.1"
      >
        <Box sm={2} align="left" pl={2} width={170}>
          <Button
            component={Link}
            to="/n"
            className="MicroButton"
          >
            <img src="/logo_1.svg" alt="logo" height={22} width={22} />
            <Typography
              sx={{
                fontSize: 18,
                ml: 1,
              }}
              fontWeight="bold"
            >
              <Box component="span" color="logo.blue">node</Box>
              <Box component="span" color="logo.red">cosmos</Box>
            </Typography>
          </Button>
        </Box>
        <Box width="calc(100% - 350px)">
          {headerContents[headerContent]}
        </Box>
        <Box width={165} pr={2}>
          <ToolbarContainer>
            <ToolbarItem title="messages" icon={faMessages} color="toolbar.green" />
            <ToolbarItem title="notifications" icon={faBell} color="toolbar.green" />
            <Tooltip title="Profile" placement="top">
              <Box ml={2}>
                <UserDropdown />
              </Box>
            </Tooltip>
          </ToolbarContainer>
        </Box>
      </Box>
    </Box>
  );
}
