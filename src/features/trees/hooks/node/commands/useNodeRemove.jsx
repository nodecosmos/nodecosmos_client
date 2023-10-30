import { deleteNodeFromState } from '../../../../nodes/nodeActions';
import { deleteNode } from '../../../../nodes/nodes.thunks';
import { deleteTreeNodeFromState } from '../../../treeActions';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useNodeRemove() {
    const dispatch = useDispatch();
    const {
        treeRootNodeId, nodeId, treeNodeId, isTemp, 
    } = useNodeContext();
    const navigate = useNavigate();

    return useCallback(() => {
        if (isTemp) {
            dispatch(deleteNodeFromState({ nodeId }));
            dispatch(deleteTreeNodeFromState({ treeNodeId }));
        } else {
            dispatch(deleteNode({ nodeId, treeNodeId }));
        }
        if (treeRootNodeId === nodeId) navigate('/nodes');
    }, [dispatch, isTemp, navigate, nodeId, treeNodeId, treeRootNodeId]);
}
