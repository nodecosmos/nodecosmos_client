import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectNode } from '../../nodes/nodes.selectors';
import { setSelectedNode } from '../../nodes/nodesSlice';
import { selectTreeNode } from '../trees.selectors';
import {
  collapseTreeNode,
  expandTreeNode,
  updateTreeNode,
  setSelectedTreeNode,
} from '../treesSlice';

export default function useNodeTreeEvents(treeNodeId) {
  const dispatch = useDispatch();

  const {
    nodeId,
    isExpanded,
    isEditing,
  } = useSelector(selectTreeNode(treeNodeId));

  const { isSelected } = useSelector(selectNode(nodeId));

  //--------------------------------------------------------------------------------------------------------------------
  const handleTreeNodeClick = useCallback(() => {
    if (isEditing) return;
    if (isExpanded && isSelected) {
      dispatch(collapseTreeNode(treeNodeId));
      dispatch(setSelectedNode(null));
      dispatch(setSelectedTreeNode(null));
    } else {
      dispatch(expandTreeNode(treeNodeId));
      dispatch(setSelectedNode(nodeId));
      dispatch(setSelectedTreeNode(treeNodeId));
    }
  }, [isEditing, isExpanded, isSelected, nodeId, treeNodeId, dispatch]);

  //--------------------------------------------------------------------------------------------------------------------
  const editTreeNode = () => dispatch(updateTreeNode({ treeNodeId, isEditing: true }));
  const handleTreeNodeBlur = () => dispatch(updateTreeNode({ treeNodeId, isEditing: false }));

  //--------------------------------------------------------------------------------------------------------------------
  return {
    handleTreeNodeClick,
    editTreeNode,
    handleTreeNodeBlur,
  };
}
