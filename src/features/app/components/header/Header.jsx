/* mui */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import TreeShowHeader from '../../../nodes/components/TreeShowHeader';

/* nodecosmos */
import NodeIndexHeader from '../../../nodes/components/NodeIndexHeader';
import { selectHeaderContent, selectTheme } from '../../app.selectors';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../constants';
import ContributionRequestShowHeader from '../../../contribution-requests/components/ContributionRequestShowHeader';
import UserHeaderOptions from './UserHeaderOptions';

const NON_HEADER_PATHS = ['/auth/login', '/auth/signup'];
const SIDEBAR_PATHS = ['/nodes'];

export default function Header() {
  const selectedTheme = useSelector(selectTheme);

  const headerContents = {
    NodeIndexHeader: <NodeIndexHeader />,
    TreeShowHeader: <TreeShowHeader />,
    ContributionRequestShowHeader: <ContributionRequestShowHeader />,
  };
  const location = useLocation();
  const headerContent = useSelector(selectHeaderContent);

  if (NON_HEADER_PATHS.includes(location.pathname)) return null;

  const hasSidebar = SIDEBAR_PATHS.some((path) => location.pathname.startsWith(path));

  const logo = selectedTheme === 'light' ? '/logo_light.svg' : '/logo_dark.svg';

  return (
    <Box height={HEADER_HEIGHT} width={1} position="relative" zIndex={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={1}
        width={1}
      >
        <Box
          height={1}
          width={SIDEBAR_WIDTH}
          display="flex"
          alignItems="center"
          sm={2}
          align="left"
          pl={2}
          borderRight={hasSidebar ? 1 : 0}
          borderBottom={hasSidebar ? 0 : 1}
          borderColor="borders.1"
        >
          <Button
            component={Link}
            to="/nodes"
            className="MicroButton"
          >
            <img src={logo} alt="logo" height={22} width={22} />
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
        <Box
          display="flex"
          width={`calc(100% - ${SIDEBAR_WIDTH}px)`}
          borderBottom={1}
          borderColor="borders.1"
          alignItems="center"
          justifyContent="space-between"
          height={1}
        >
          <Box
            pl={2}
            height={1}
            display="flex"
            alignItems="center"
            width="calc(100% - 140px)"
          >
            {headerContents[headerContent]}
          </Box>
          <Box
            mr={2}
            height={1}
            display="flex"
            alignItems="center"
          >
            <UserHeaderOptions />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
