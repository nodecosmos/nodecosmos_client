import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import { HEADER_HEIGHT } from '../../features/app/constants';
import ContributionRequestsShowToolbar
  from '../../features/contribution-requests/components/ContributionRequestsShowToolbar';

export default function Show() {
  const { id: nodeId } = useParams();
  return (
    <Box height={1} overflow="hidden">
      <ContributionRequestsShowToolbar nodeId={nodeId} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
        <Outlet />
      </Box>
    </Box>
  );
}
