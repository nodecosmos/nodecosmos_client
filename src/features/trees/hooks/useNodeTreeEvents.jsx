import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectNode, selectNodeAttribute } from '../../nodes/nodes.selectors';
import { setSelectedNode } from '../../nodes/nodesSlice';
import { selectTreeNode } from '../trees.selectors';
import {
  collapseTreeNode,
  expandTreeNode,
  updateTreeNode,
  setSelectedTreeNode,
} from '../treesSlice';
import { useTreeCheckbox } from './useTreeContext';

export default function useNodeTreeEvents(treeNodeId) {
  const { nodeId, isExpanded, isEditing } = useSelector(selectTreeNode(treeNodeId));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const { isSelected } = useSelector(selectNode(nodeId));
  const { treeType, commands } = useTreeCheckbox();
  const dispatch = useDispatch();

  //--------------------------------------------------------------------------------------------------------------------
  const handleCheckboxChange = useCallback(() => {
    const isNodeChecked = commands.isChecked(persistentId);
    if (isNodeChecked) {
      commands.deleteId(persistentId);
    } else {
      commands.addId(persistentId);
    }
  }, [commands, persistentId]);

  //--------------------------------------------------------------------------------------------------------------------
  const handleTreeNodeClick = useCallback((event) => {
    if (event.target.type === 'checkbox') return;
    if (treeType === 'checkbox') {
      handleCheckboxChange();
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
