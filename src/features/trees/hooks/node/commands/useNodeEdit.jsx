import { updateTreeNode } from '../../../treeActions';
import useNodeContext from '../useNodeContext';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useNodeEdit() {
    const { treeNodeId } = useNodeContext();
    const dispatch = useDispatch();

    return useCallback((eventy) => {
        eventy.stopPropagation();
        dispatch(updateTreeNode({ treeNodeId, isEditing: true }));
    }, [dispatch, treeNodeId]);
}
