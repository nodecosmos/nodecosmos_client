import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* nodecosmos */
import usePrevProps from '../../../common/hooks/usePrevProps';
import { setAlert } from '../../app/appSlice';
import { selectNodeAttributeById, selectNodeById } from '../../nodes/nodes.selectors';
import { createNode, deleteNode, updateNode } from '../../nodes/nodes.thunks';
import { updateNodeState } from '../../nodes/nodesSlice';
import { selectTreeNodeAttributeById, selectTreeNodeById } from '../trees.selectors';
import {
  buildNewTreeNode,
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
    isTemp,
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

    // if (isTemp) return;

    if (!nodeId) {
      const message = title ? `Node "${title}" not initialized yet. Please wait...`
        : 'Current node not initialized yet. '
        + 'Please add title to current node in order to create child node.';

      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message,
      }));
    } else {
      dispatch(buildNewTreeNode({ treeParentId: treeNodeId, parentId: nodeId }));
    }
  };

  const editNode = () => dispatch(updateTreeNode({ treeNodeId, isEditing: true }));

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null);
  const saveNode = useCallback(() => {
    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

    saveNodeTimeout.current = setTimeout(() => {
      if (!title || title === prevTitle) return;

      if (isTemp) {
        dispatch(createNode({ treeNodeId, title, parent_id: parentId }));
      } else {
        dispatch(updateNode({ id: nodeId, title }));
      }
    }, 1000);
  }, [dispatch, isTemp, nodeId, parentId, prevTitle, title, treeNodeId]);

  const handleNodeTitleChange = (event) => {
    dispatch(updateNodeState({ id: nodeId, title: event.currentTarget.value }));
  };

  const handleNodeBlur = () => { dispatch(updateTreeNode({ treeNodeId, isEditing: false })); };

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
    saveNode,
    handleNodeTitleChange,
    handleNodeBlur,
  };
}
