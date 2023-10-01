import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import { setSelectedNode } from '../../nodes/nodesSlice';
import {
  collapseTreeNode,
  expandTreeNode,
  updateTreeNode,
  setSelectedTreeNode,
} from '../treesSlice';
import { useTreeCheckbox } from './useTreeContext';
import useNodeContext from './useNodeContext';

export default function useNodeTreeEvents() {
  const {
    treeNodeId,
    nodeId,
    isExpanded,
    isEditing,
    isSelected,
  } = useNodeContext();

  const { treeType, commands } = useTreeCheckbox();
  const dispatch = useDispatch();

  //--------------------------------------------------------------------------------------------------------------------
  const handleCheckboxChange = useCallback(() => {
    const isNodeChecked = commands.isChecked(nodeId);
    if (isNodeChecked) {
      commands.deleteId(nodeId);
    } else {
      commands.addId(nodeId);
    }
  }, [commands, nodeId]);

  //--------------------------------------------------------------------------------------------------------------------
  const handleTreeNodeClick = useCallback((event) => {
    if (treeType === 'checkbox') {
      handleCheckboxChange();
      event.preventDefault();
      event.stopPropagation();

      return;
    }
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
  }, [treeType, isEditing, isExpanded, isSelected, handleCheckboxChange, dispatch, treeNodeId, nodeId]);

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
