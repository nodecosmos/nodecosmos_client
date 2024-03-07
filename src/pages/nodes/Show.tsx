import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import useNodeSSE from '../../features/nodes/hooks/useNodeSSE';
import { showNode } from '../../features/nodes/nodes.thunks';
import { NodecosmosDispatch } from '../../store';
import { UUID } from '../../types';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Outlet, useNavigate, useParams,
} from 'react-router-dom';

export default function NodeShow() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    if (!id) {
        navigate('/404');
    }

    const [isNodeFetched, setIsNodeFetched] = React.useState(false);

    useNodeSSE(id as UUID, isNodeFetched);

    useEffect(() => {
        if (isNodeFetched) {
            return;
        }

        if (!id) {
            throw new Error('Node ID is not defined');
        }

        dispatch(showNode(id)).then((response) => {
            setIsNodeFetched(true);

            if (response.meta.requestStatus === 'rejected') {
                navigate('/404');
                console.error(response);

                return;
            }
        });
    }, [dispatch, navigate, id, isNodeFetched]);

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
