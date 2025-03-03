import { NodecosmosDispatch } from '../../../store';
import { ObjectType, UUID } from '../../../types';
import { useSelectObject } from '../../app/hooks/useSelectObject';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectNodeFromParams, setNodeScrollTo } from '../../nodes/nodes.actions';
import { selectNode } from '../../nodes/nodes.selectors';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNavigateToNode(id: UUID) {
    const {
        originalId, branchId, nodeId,
    } = useBranchContext();
    const node = useSelector(selectNode(branchId, id));
    const navigate = useNavigate();
    const selectObject = useSelectObject();
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback(() => {
        if (!id) {
            throw new Error('Node ID is required');
        }

        selectObject({
            objectId: id,
            originalId,
            branchId,
            objectNodeId: id,
            objectType: ObjectType.Node,
            metadata: { ancestorIds: node?.ancestorIds || [] },
        });

        navigate(
            `/nodes/${originalId}/${nodeId}/contribution_requests/${branchId}/tree`,
        );

        dispatch(selectNodeFromParams({
            branchId,
            id,
        }));

        setTimeout(() => {
            dispatch(setNodeScrollTo(id));
        }, 250);
    }, [branchId, dispatch, id, navigate, node?.ancestorIds, nodeId, originalId, selectObject]);
}
