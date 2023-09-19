import React from 'react';
import {
  Box, Tab, Tabs,
} from '@mui/material';
import PropTypes from 'prop-types';
import { HEADER_HEIGHT } from '../../app/constants';

export default function ContributionRequestsShowToolbar({ nodeId }) {
  return (
    <Box
      height={HEADER_HEIGHT}
      width={1}
      display="flex"
      alignItems="center"
      position="relative"
      boxShadow="2"
      borderBottom={1}
      borderColor="borders.1"
      zIndex={3}
    >

      <Tabs value={1} centered>
        <Tab label="Commits" />
        <Tab label="Tree" />
        <Tab label="Workflow" />
      </Tabs>
    </Box>
  );
}

ContributionRequestsShowToolbar.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
