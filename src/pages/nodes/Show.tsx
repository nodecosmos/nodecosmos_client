import { clearSelectedObject } from '../../features/app/appSlice';
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import useBranchParams from '../../features/branch/hooks/useBranchParams';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import useNodeSSE from '../../features/nodes/hooks/useNodeSSE';
import { selectOptNode } from '../../features/nodes/nodes.selectors';
import { showNode } from '../../features/nodes/nodes.thunks';
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
    const { branchId } = useBranchParams();

    if (!id) {
        navigate('/404');
    }

    const optNode = useSelector(selectOptNode(branchId as UUID, id as UUID));
    const isNodeFetched = !!optNode;

    useNodeSSE(id as UUID, isNodeFetched);

    useEffect(() => {
        if (isNodeFetched) {
            return;
        }

        if (!id) {
            throw new Error('Node ID is not defined');
        }

        dispatch(showNode({
            branchId,
            id,
        })).then((response) => {
            if (response.meta.requestStatus === 'rejected') {
                navigate('/404');
                console.error(response);

                return;
            }
        });

        return () => {
            dispatch(clearSelectedObject());
        };
    }, [dispatch, navigate, id, isNodeFetched, branchId]);

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
