import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import ContributionRequestsToolbar
  from '../../features/contribution-requests/components/ContributionRequestsToolbar';
import { indexContributionRequests } from '../../features/contribution-requests/contributionRequests.thunks';
import Loader from '../../common/components/Loader';
import ContributionRequestsList from '../../features/contribution-requests/components/ContributionRequestsList';
import { HEADER_HEIGHT } from '../../features/app/constants';

export default function Index() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) setLoading(true);
    dispatch(indexContributionRequests(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box height={1}>
      <ContributionRequestsToolbar nodeId={id} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
        <ContributionRequestsList nodeId={id} />
      </Box>
    </Box>
  );
}
