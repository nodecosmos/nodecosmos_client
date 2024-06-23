import MobileSidebar from './sidebar/MobileSidebar';
import Sidebar from './sidebar/Sidebar';
import Loader from '../../../common/components/Loader';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import {
    DISPLAY_MD_SX, SIDEBAR_WIDTH, MD_WO_SIDEBAR_WIDTH_SX,
} from '../../app/constants';
import { useSelectObjectFromParams } from '../../app/hooks/useSelectObject';
import useBranchContext from '../../branch/hooks/useBranchContext';
import useNodeSSE from '../hooks/sse/useNodeSSE';
import { maybeSelectNode } from '../nodes.selectors';
import { showBranchNode, showNode } from '../nodes.thunks';
import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Outlet, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';

export default function NodeShowContent() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        originalId, branchId, isBranch,
    } = useBranchContext();
    if (!id) {
        navigate('/404');
    }
    const originalNode = useSelector(maybeSelectNode(originalId, id as UUID));
    const branchNode = useSelector(maybeSelectNode(branchId, id as UUID));

    useNodeSSE(originalNode?.rootId);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!id) {
            throw new Error('Node ID is not defined');
        }

        if (!originalNode) {
            dispatch(showNode({
                branchId: originalId,
                id,
            })).then((response) => {
                if (!isBranch) {
                    if (response.meta.requestStatus === 'rejected') {
                        navigate('/404');
                        console.error(response);

                        return;
                    }
                }
            });
        }
    }, [dispatch, id, isBranch, navigate, originalId, originalNode]);

    const isBranchQ = searchParams.get('isBranchQ');
    const originalIdQ = searchParams.get('originalIdQ');

    useEffect(() => {
        if ((isBranch || isBranchQ) && !branchNode) {
            dispatch(showBranchNode({
                branchId,
                id: id as UUID,
                originalId: originalIdQ,
            }));
        }
    }, [branchId, branchNode, dispatch, id, isBranch, isBranchQ, originalIdQ]);

    const expandedNodesFromParams = useRef<boolean>(false);
    const selectObjectFromParams = useSelectObjectFromParams();

    useEffect(() => {
        if (expandedNodesFromParams.current) return;
        if (!isBranch && !originalNode) return;
        if (isBranch && !branchNode) return;

        selectObjectFromParams();
        expandedNodesFromParams.current = true;
    }, [branchNode, isBranch, originalNode, selectObjectFromParams]);

    if (!isBranch && !originalNode) {
        return <Loader />;
    }

    if (isBranch && !branchNode) {
        return <Loader />;
    }

    return (
        <Box height={1} display="flex">
            <Box
                width={SIDEBAR_WIDTH}
                display={DISPLAY_MD_SX}
                borderRight={1}
                borderColor="borders.1"
                zIndex={4}
            >
                <Sidebar />
            </Box>
            <MobileSidebar />
            <Box width={MD_WO_SIDEBAR_WIDTH_SX}>
                <Outlet />
            </Box>
        </Box>
    );
}
