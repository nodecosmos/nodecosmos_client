import { SIDEBAR_WIDTH } from '../../features/app/constants';
import { showBranch } from '../../features/branch/branches.thunks';
import useBranchParams from '../../features/branch/hooks/useBranchParams';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import useNodeSSE from '../../features/nodes/hooks/sse/useNodeSSE';
import { selectOptNode } from '../../features/nodes/nodes.selectors';
import { showBranchNode, showNode } from '../../features/nodes/nodes.thunks';
import { NodecosmosDispatch } from '../../store';
import { UUID } from '../../types';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Outlet, useNavigate, useParams,
} from 'react-router-dom';

export default function NodeShow() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        originalId, branchId, isBranch,
    } = useBranchParams();
    if (!id) {
        navigate('/404');
    }
    const optNode = useSelector(selectOptNode(originalId as UUID, id as UUID));
    const isNodeFetched = !!optNode;
    const [branchedFetched, setBranchedFetched] = React.useState(false);

    useNodeSSE(optNode?.rootId);

    useEffect(() => {
        if (isNodeFetched) {
            return;
        }

        if (!id) {
            throw new Error('Node ID is not defined');
        }

        dispatch(showNode({
            branchId: originalId,
            id,
        })).then((response) => {
            if (response.meta.requestStatus === 'rejected') {
                navigate('/404');
                console.error(response);

                return;
            }
        });
    }, [originalId, dispatch, navigate, id, isNodeFetched, branchId]);

    useEffect(() => {
        if (isBranch && !branchedFetched) {
            console.log('showBranchNode');
            dispatch(showBranchNode({
                branchId,
                id: id as UUID,
            }));
            dispatch(showBranch(branchId));
            setBranchedFetched(true);
        }
    }, [branchId, branchedFetched, dispatch, id, isBranch, isNodeFetched]);

    if (!isNodeFetched) {
        return null;
    }

    return (
        <Box height={1} display="flex">
            <Box
                width={SIDEBAR_WIDTH}
                borderRight={1}
                borderColor="borders.1"
                zIndex={4}
            >
                <Sidebar />
            </Box>
            <Box width={`calc(100% - ${SIDEBAR_WIDTH}px)`}>
                <Outlet />
            </Box>
        </Box>
    );
}
