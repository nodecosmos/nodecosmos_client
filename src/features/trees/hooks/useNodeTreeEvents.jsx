import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* nodecosmos */
import usePrevProps from '../../../common/hooks/usePrevProps';
import { setAlert } from '../../app/appSlice';
import { selectNodeAttributeById } from '../../nodes/nodes.selectors';
import { createNode, deleteNode, updateNode } from '../../nodes/nodes.thunks';
import { buildTmpNode, updateNodeState } from '../../nodes/nodesSlice';
import { SAVE_NODE_TIMEOUT } from '../trees.constants';
import { selectTreeNodeById } from '../trees.selectors';
import {
  buildChildNode,
  collapseTreeNode,
  expandTreeNode,
  removeTreeNodeFromState,
  setSelectedTreeNode,
  updateTreeNode,
} from '../treesSlice';

export default function useNodeTreeEvents(treeNodeId) {
  const dispatch = useDispatch();

  const {
    nodeId,
    parentId,
    isRoot,
    isExpanded,
    isSelected,
    isEditing,
    isTemp,
  } = useSelector(selectTreeNodeById(treeNodeId));

  const title = useSelector(selectNodeAttributeById(nodeId, 'title'));
  const prevTitle = usePrevProps(title);
  const navigate = useNavigate();

  //--------------------------------------------------------------------------------------------------------------------
  const onNodeClick = () => {
    if (isEditing) return;
    if (isExpanded && isSelected) {
      dispatch(collapseTreeNode(treeNodeId));
      dispatch(setSelectedTreeNode({ treeNodeId, value: false }));
    } else {
      dispatch(expandTreeNode(treeNodeId));
      dispatch(setSelectedTreeNode({ treeNodeId, value: true }));
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  const addChildNodeLastClick = useRef(null);
  const addChildNode = async () => {
    // prevent clicking too fast
    const delta = 150;
    const now = Date.now();

    if (now - addChildNodeLastClick.current < delta) return;

    addChildNodeLastClick.current = now;

    if (isTemp) {
      const message = title ? `Node "${title}" not initialized yet. Please wait...`
        : 'Current node not initialized yet. '
        + 'Please add title to current node in order to create child node.';

      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message,
      }));
    } else {
      const tmpNodeId = Date.now();
      dispatch(buildChildNode({ treeParentId: treeNodeId, tmpNodeId, parentId: nodeId }));
      dispatch(buildTmpNode({ tmpNodeId }));
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  const handleNodeTitleChange = (event) => {
    dispatch(updateNodeState({ id: nodeId, title: event.currentTarget.value }));
  };

  const editNode = () => dispatch(updateTreeNode({ treeNodeId, isEditing: true }));

  // save node after 1 second of inactivity
  const saveNodeTimeout = useRef(null);
  const saveNode = () => {
    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

    saveNodeTimeout.current = setTimeout(() => {
      if (!title || title === prevTitle) return;

      if (isTemp) {
        dispatch(createNode({ treeNodeId, title, parent_id: parentId }));
      } else {
        dispatch(updateNode({ id: nodeId, title }));
      }
    }, SAVE_NODE_TIMEOUT);
  };

  const handleNodeBlur = () => dispatch(updateTreeNode({ treeNodeId, isEditing: false }));

  const removeNode = () => {
    if (isTemp) {
      dispatch(removeTreeNodeFromState(treeNodeId));
    } else {
      dispatch(deleteNode(nodeId));
    }
    if (isRoot) navigate('/n');
  };

  //--------------------------------------------------------------------------------------------------------------------
  return {
    onNodeClick,
    addChildNode,
    editNode,
    removeNode,
    handleNodeTitleChange,
    saveNode,
    handleNodeBlur,
  };
}
