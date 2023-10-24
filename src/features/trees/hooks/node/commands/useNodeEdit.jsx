import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateTreeNode } from '../../../treeActions';
import useNodeContext from '../useNodeContext';

export default function useNodeEdit() {
    const { treeNodeId } = useNodeContext();
    const dispatch = useDispatch();

    return useCallback((eventy) => {
        eventy.stopPropagation();
        dispatch(updateTreeNode({ treeNodeId, isEditing: true }));
    }, [dispatch, treeNodeId]);
}
