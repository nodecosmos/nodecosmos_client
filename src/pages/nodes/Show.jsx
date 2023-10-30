/* mui */
import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Sidebar from '../../features/nodes/components/sidebar/Sidebar';
import { showNode } from '../../features/nodes/nodes.thunks';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Outlet, useNavigate, useParams, 
} from 'react-router-dom';
/* nodecosmos */

export default function NodeShow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    if (!id) {
        navigate('/404');
    }

    const [isNodeFetched, setIsNodeFetched] = React.useState(false);

    useEffect(() => {
        if (isNodeFetched) {
            return;
        }

        dispatch(showNode(id)).then((response) => {
            setIsNodeFetched(true);
            if (response.error) {
                navigate('/404');
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
