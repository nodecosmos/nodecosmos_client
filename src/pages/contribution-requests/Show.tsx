import { setHeaderContent } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import CRShowToolbar from '../../features/contribution-requests/components/ContributionRequestsShowToolbar';
import { selectContributionRequest } from '../../features/contribution-requests/contributionRequests.selectors';
import { showContributionRequest } from '../../features/contribution-requests/contributionRequests.thunks';
import { setCurrentContributionRequest } from '../../features/contribution-requests/contributionRequestsSlice';
import { maybeSelectNode } from '../../features/nodes/nodes.selectors';
import { NodecosmosDispatch } from '../../store';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function Show() {
    const { nodeId, branchId } = useBranchContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const cr = useSelector(selectContributionRequest(nodeId, branchId));
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const rootId = node?.rootId;

    useEffect(() => {
        if (!rootId) return;

        dispatch(setHeaderContent('ContributionRequestShowHeader'));
        dispatch(showContributionRequest({
            rootId,
            nodeId,
            id: branchId,
        }));

        return () => {
            dispatch(setHeaderContent(''));
            dispatch(setCurrentContributionRequest(null));
        };
    }, [dispatch, branchId, nodeId, rootId]);

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
