import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { setSelectedNode } from '../../nodes/nodesSlice';
import { selectTreeNodeAttribute } from '../trees.selectors';
import {
  collapseTreeNode,
  expandTreeNode,
  updateTreeNode,
  setSelectedTreeNode,
} from '../treesSlice';
import { useTreeCheckbox } from './useTreeContext';

export default function useNodeTreeEvents(treeNodeId) {
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const isExpanded = useSelector(selectTreeNodeAttribute(treeNodeId, 'isExpanded'));
  const isEditing = useSelector(selectTreeNodeAttribute(treeNodeId, 'isEditing'));

  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));

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
