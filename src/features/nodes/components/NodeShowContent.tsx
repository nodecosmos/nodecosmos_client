import MobileSidebar from './sidebar/MobileSidebar';
import Sidebar from './sidebar/Sidebar';
import Loader from '../../../common/components/Loader';
import useMetaAttributes from '../../../common/hooks/useMetaAttributes';
import { NodecosmosDispatch } from '../../../store';
import { ObjectType, UUID } from '../../../types';
import { selectSelectedObject } from '../../app/app.selectors';
import { selectObject } from '../../app/app.thunks';
import { setAlert } from '../../app/appSlice';
import {
    DISPLAY_MD_SX, SIDEBAR_WIDTH, MD_WO_SIDEBAR_WIDTH_SX,
} from '../../app/constants';
import { SELECTED_OBJ_Q, useSelectObjectFromParams } from '../../app/hooks/useSelectObject';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectDescription } from '../../descriptions/descriptions.selectors';
import useNodeSSE from '../hooks/sse/useNodeSSE';
import { selectNodeFromParams } from '../nodes.actions';
import { maybeSelectNode } from '../nodes.selectors';
import { showBranchNode, showNode } from '../nodes.thunks';
import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Outlet, useNavigate, useSearchParams,
} from 'react-router-dom';

const decodeSelectedObjQ = (params: URLSearchParams) => {
    const data = params.get(SELECTED_OBJ_Q);
    return data ? JSON.parse(atob(data)) : null;
};

export default function NodeShowContent() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const {
        originalId, branchId, isBranch, isBranchQ, nodeId: id,
    } = useBranchContext();
    if (!id) {
        navigate('/404');
    }
    const originalNode = useSelector(maybeSelectNode(originalId, id as UUID));
    const branchNode = useSelector(maybeSelectNode(branchId, id as UUID));
    const [searchParams, setSearchParams] = useSearchParams();

    // metaTitle, metaDescription, metaImageURL
    const selectedObject = useSelector(selectSelectedObject);
    const objectDesc = useSelector(selectDescription(branchId, selectedObject?.objectId));
    const selectedNode = useSelector(maybeSelectNode(branchId, selectedObject?.objectId));
    const metaTitle = selectedObject?.objectTitle;
    const metaDescription = objectDesc?.shortDescription;
    const metaImageURL = selectedNode?.coverImageUrl || branchNode?.coverImageUrl;

    useMetaAttributes({
        title: metaTitle,
        description: metaDescription,
        image: metaImageURL,
    });

    useNodeSSE(originalNode?.rootId);

    useEffect(() => {
        if (!id) {
            throw new Error('Node ID is not defined');
        }

        if (searchParams.get('subscribed')) {
            dispatch(setAlert({
                isOpen: true,
                message: 'You have successfully subscribed to this node',
                severity: 'success',
            }));

            searchParams.delete('subscribed');

            setSearchParams(searchParams);
        }
        const selectedData = decodeSelectedObjQ(searchParams);

        if (!originalNode || !originalNode.ownerId) {
            let selectNodeFromParams;

            if (!isBranch) {
                if (selectedData
                    && !selectedObject
                    && selectedData.objectType === ObjectType.Node
                    && selectedData.branchId === originalId) {
                    selectNodeFromParams = {
                        branchId: selectedData.branchId,
                        id: selectedData.objectId,
                    };
                } else if (!selectedObject) {
                    selectNodeFromParams = {
                        branchId,
                        id,
                    };
                }
            }

            dispatch(showNode({
                branchId: originalId,
                id,
                selectNodeFromParams,
            })).then((response) => {
                if (!isBranch) {
                    if (response.meta.requestStatus === 'rejected') {
                        navigate('/404');
                        console.error(response);

                        return;
                    }

                    if (!selectedData && !selectedObject) {
                        dispatch(selectObject({
                            originalId,
                            objectId: id,
                            branchId: originalId,
                            objectNodeId: id,
                            objectType: ObjectType.Node,
                        }));
                    }
                }
            });
        } else {
            if (!selectedData && !selectedObject) {
                dispatch(selectObject({
                    originalId,
                    objectId: id,
                    branchId: originalId,
                    objectNodeId: id,
                    objectType: ObjectType.Node,
                }));

                dispatch(selectNodeFromParams({
                    branchId,
                    id,
                }));
            }
        }
        // no need for searchParams as we only select from params on initial render
        // eslint-disable-next-line
    }, [dispatch, id, isBranch, navigate, originalId, originalNode, selectedObject]);

    useEffect(() => {
        if ((isBranch || isBranchQ) && !branchNode) {
            const selectedData = decodeSelectedObjQ(searchParams);
            let selectNodeFromParams;

            if (selectedData && selectedData.objectType === ObjectType.Node && selectedData.branchId !== originalId) {
                selectNodeFromParams = {
                    branchId: selectedData.branchId,
                    id: selectedData.objectId,
                };
            }

            dispatch(showBranchNode({
                branchId,
                id: id as UUID,
                originalId,
                selectNodeFromParams,
            }));
        }
        // no need for searchParams as we only select from params on initial render
        // eslint-disable-next-line
    }, [branchId, branchNode, dispatch, id, isBranch, isBranchQ, originalId]);

    const expandedNodesFromParams = useRef<boolean>(false);
    const selectObjectFromParams = useSelectObjectFromParams();

    const loading = (!isBranch && !originalNode) || (isBranch && !branchNode);

    useEffect(() => {
        if (expandedNodesFromParams.current) return;
        if (loading) return;

        selectObjectFromParams();
        expandedNodesFromParams.current = true;
    }, [loading, selectObjectFromParams]);

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
            <Box width={MD_WO_SIDEBAR_WIDTH_SX} className="overflow-auto">
                {
                    loading ? <Loader /> : <Outlet />
                }
            </Box>
        </Box>
    );
}
