import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateTreeNode } from '../../../treesSlice';
import useNodeContext from '../useNodeContext';

export default function useNodeEdit() {
  const { treeNodeId } = useNodeContext();
  const dispatch = useDispatch();

  return useCallback(() => dispatch(updateTreeNode({ treeNodeId, isEditing: true })), [dispatch, treeNodeId]);
}
