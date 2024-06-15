import Loader from '../../common/components/Loader';
import { HEADER_HEIGHT } from '../../features/app/constants';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import ContributionRequestsIndexToolbar
    from '../../features/contribution-requests/components/ContributionRequestsIndexToolbar';
import ContributionRequestsList from '../../features/contribution-requests/components/ContributionRequestsList';
import { indexContributionRequests } from '../../features/contribution-requests/contributionRequests.thunks';
import { maybeSelectNode } from '../../features/nodes/nodes.selectors';
import { NodecosmosDispatch } from '../../store';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Index() {
    const { branchId, nodeId } = useBranchContext();
    const [loading, setLoading] = useState(true);
    const dispatch: NodecosmosDispatch = useDispatch();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const rootId = node?.rootId;

    useEffect(() => {
        if (!rootId) setLoading(true);
        dispatch(indexContributionRequests(nodeId)).then(() => setLoading(false));
    }, [dispatch, nodeId, rootId]);

    if (loading || !rootId) {
        return <Loader />;
    }

    return (
        <Box height={1} overflow="hidden">
            <ContributionRequestsIndexToolbar nodeId={nodeId} rootId={rootId} />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                <ContributionRequestsList nodeId={nodeId} />
            </Box>
        </Box>
    );
}
