import { setHeaderContent } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';
import CRShowToolbar from '../../features/contribution-requests/components/ContributionRequestsShowToolbar';
import { selectContributionRequest } from '../../features/contribution-requests/contributionRequests.selectors';
import { showContributionRequest } from '../../features/contribution-requests/contributionRequests.thunks';
import { setCurrentContributionRequest } from '../../features/contribution-requests/contributionRequestsSlice';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

export default function Show() {
    const { id: nodeId, contributionRequestId } = useParams();
    const dispatch = useDispatch();

    const cr = useSelector(selectContributionRequest(nodeId, contributionRequestId));

    useEffect(() => {
        dispatch(setHeaderContent('ContributionRequestShowHeader'));
        dispatch(showContributionRequest({ nodeId, id: contributionRequestId }));

        return () => {
            dispatch(setHeaderContent(''));
            dispatch(setCurrentContributionRequest(null));
        };
    }, [contributionRequestId, dispatch, nodeId]);

    useEffect(() => {
        if (cr) {
            dispatch(setCurrentContributionRequest(cr));
        }
    }, [dispatch, cr]);

    return (
        <Box height={1} overflow="hidden">
            <CRShowToolbar />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                <Outlet />
            </Box>
        </Box>
    );
}
