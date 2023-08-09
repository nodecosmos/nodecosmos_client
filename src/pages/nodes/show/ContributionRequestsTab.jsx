import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ContributionRequestsToolbar
  from '../../../features/contribution-requests/components/ContributionRequestsToolbar';
import { indexContributionRequests } from '../../../features/contribution-requests/contributionRequests.thunks';
import Loader from '../../../common/components/Loader';
import ContributionRequestsList from '../../../features/contribution-requests/components/ContributionRequestsList';

export default function ContributionRequestsTab() {
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
    <div>
      <ContributionRequestsToolbar nodeId={id} />
      <ContributionRequestsList nodeId={id} />
    </div>
  );
}
