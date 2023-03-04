import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* nodecosmos */
import usePrevious from '../../../common/hooks/usePrevious';
import { setAlert } from '../../app/appSlice';
import { selectNode } from '../../nodes/nodes.selectors';
import { createNode, deleteNode, updateNode } from '../../nodes/nodes.thunks';
import {
  buildChildNode, deleteNodeFromState, setSelectedNode, updateNodeState,
} from '../../nodes/nodesSlice';
import { SAVE_NODE_TIMEOUT } from '../trees.constants';
import { selectTreeNode } from '../trees.selectors';
import {
  collapseTreeNode,
  expandTreeNode,
  updateTreeNode,
  setCurrentTempNodeId,
} from '../treesSlice';

export default function useNodeTreeEvents(treeNodeId) {
  const dispatch = useDispatch();

  const {
    nodeId,
    isRoot,
    isExpanded,
    isEditing,
  } = useSelector(selectTreeNode(treeNodeId));

  const {
    parentId,
    persistentId,
    persistentParentId,
    title,
    isTemp,
    isSelected,
  } = useSelector(selectNode(nodeId));

  const prevTitle = usePrevious(title);
  const navigate = useNavigate();

  //--------------------------------------------------------------------------------------------------------------------
  const onNodeClick = useCallback(() => {
    if (isEditing) return;
    if (isExpanded && isSelected) {
      dispatch(collapseTreeNode(treeNodeId));
      dispatch(setSelectedNode(null));
    } else {
      dispatch(expandTreeNode(treeNodeId));
      dispatch(setSelectedNode(nodeId));
    }
  }, [isEditing, isExpanded, isSelected, nodeId, treeNodeId, dispatch]);

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

      dispatch(setAlert({ isOpen: true, severity: 'error', message }));
    } else {
      const tmpNodeId = Date.now().toString();

      dispatch(setCurrentTempNodeId(tmpNodeId));
      dispatch(buildChildNode({ tmpNodeId, nodeId, persistentId }));
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  const handleNodeTitleChange = (event) => dispatch(updateNodeState({ id: nodeId, title: event.currentTarget.value }));
  const editNode = () => dispatch(updateTreeNode({ treeNodeId, isEditing: true }));
  const handleNodeBlur = () => dispatch(updateTreeNode({ treeNodeId, isEditing: false }));

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null); // save node after 1 second of inactivity
  const saveNode = () => {
    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

    saveNodeTimeout.current = setTimeout(() => {
      if (!title || title === prevTitle) return;

      if (isTemp) {
        dispatch(createNode({
          title,
          parent_id: persistentParentId,
          tmpNodeId: nodeId,
          parentId,
        }));
      } else {
        dispatch(updateNode({ id: persistentId, title }));
      }
    }, SAVE_NODE_TIMEOUT);
  };

  const removeNode = () => {
    if (isTemp) {
      dispatch(deleteNodeFromState({ nodeId }));
    } else {
      dispatch(deleteNode({ id: persistentId, nodeId }));
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
