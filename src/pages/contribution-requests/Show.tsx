import Loader from '../../common/components/Loader';
import { setHeaderContent } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';
import useBranchParams from '../../features/branch/hooks/useBranchParams';
import { indexComments } from '../../features/comments/comments.thunks';
import CRShowToolbar from '../../features/contribution-requests/components/ContributionRequestsShowToolbar';
import { selectContributionRequest } from '../../features/contribution-requests/contributionRequests.selectors';
import { showContributionRequest } from '../../features/contribution-requests/contributionRequests.thunks';
import { setCurrentContributionRequest } from '../../features/contribution-requests/contributionRequestsSlice';
import { select } from '../../features/nodes/nodes.actions';
import { showBranchNode } from '../../features/nodes/nodes.thunks';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosError } from '../../types';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function Show() {
    const { currentOriginalBranchId, currentBranchId } = useBranchParams();
    const dispatch: NodecosmosDispatch = useDispatch();

    const cr = useSelector(selectContributionRequest(currentOriginalBranchId, currentBranchId));
    const [isNodeFetched, setIsNodeFetched] = React.useState(false);

    useEffect(() => {
        dispatch(setHeaderContent('ContributionRequestShowHeader'));
        dispatch(showContributionRequest({
            nodeId: currentOriginalBranchId,
            id: currentBranchId,
        })).then(() => dispatch(indexComments(currentBranchId)));

        return () => {
            dispatch(setHeaderContent(''));
            dispatch(setCurrentContributionRequest(null));
        };
    }, [currentOriginalBranchId, dispatch, currentBranchId]);

    useEffect(() => {
        if (cr) {
            dispatch(setCurrentContributionRequest(cr));
        }

        return () => {
            dispatch(select(null));
        };
    }, [dispatch, cr]);

    useEffect(() => {
        if (isNodeFetched) {
            return;
        }

        dispatch(showBranchNode({
            branchId: currentBranchId,
            id: currentOriginalBranchId,
        })).then((response) => {
            setIsNodeFetched(true);

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                console.error(error);

                return;
            }
        });
    }, [currentOriginalBranchId, dispatch, isNodeFetched, currentBranchId]);

    if (!isNodeFetched) {
        return <Loader />;
    }

    return (
        <Box height={1} overflow="hidden">
            <CRShowToolbar />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                <Outlet />
            </Box>
        </Box>
    );
}
