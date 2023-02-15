import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* nodecosmos */
import usePrevProps from '../../../common/hooks/usePrevProps';
import { setAlert } from '../../app/appSlice';
import { selectNodeAttributeById } from '../../nodes/nodes.selectors';
import { createNode, deleteNode, updateNode } from '../../nodes/nodes.thunks';
import { updateNodeState } from '../../nodes/nodesSlice';
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
    isNewlyAddedNode,
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

    if (!nodeId) {
      const message = nodeId ? `Node "${title}" not initialized yet. Please wait...`
        : 'Current node not initialized yet. '
        + 'Please add title to current node in order to create child node.';

      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message,
      }));
    } else {
      dispatch(buildChildNode({ treeParentId: treeNodeId, parentId: nodeId }));
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  const handleNodeTitleChange = (event) => {
    dispatch(updateNodeState({ id: nodeId, title: event.currentTarget.value }));
  };

  const editNode = () => dispatch(updateTreeNode({ treeNodeId, isEditing: true }));

  const saveNodeTimeout = useRef(null);
  const saveNode = useCallback(() => {
    // save node after 1 second of inactivity
    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

    saveNodeTimeout.current = setTimeout(() => {
      if (!title || title === prevTitle) return;

      if (nodeId) {
        dispatch(updateNode({ id: nodeId, title }));
      } else {
        dispatch(createNode({ treeNodeId, title, parent_id: parentId }));
      }
    }, SAVE_NODE_TIMEOUT);
  }, [dispatch, nodeId, parentId, prevTitle, title, treeNodeId]);

  const handleNodeBlur = () => dispatch(updateTreeNode({ treeNodeId, isEditing: false }));

  const removeNode = () => {
    if (isNewlyAddedNode) {
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
