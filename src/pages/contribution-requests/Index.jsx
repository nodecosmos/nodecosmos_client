import Loader from '../../common/components/Loader';
import { HEADER_HEIGHT } from '../../features/app/constants';
import ContributionRequestsIndexToolbar
    from '../../features/contribution-requests/components/ContributionRequestsIndexToolbar';
import ContributionRequestsList from '../../features/contribution-requests/components/ContributionRequestsList';
import { indexContributionRequests } from '../../features/contribution-requests/contributionRequests.thunks';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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
        <Box height={1} overflow="hidden">
            <ContributionRequestsIndexToolbar nodeId={id} />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                <ContributionRequestsList nodeId={id} />
            </Box>
        </Box>
    );
}
