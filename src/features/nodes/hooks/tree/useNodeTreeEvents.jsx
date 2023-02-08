import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usePrevProps from '../../../../common/hooks/usePrevProps';
import { setAlert } from '../../../app/appSlice';
import { createNode, deleteNode, updateNode } from '../../nodes.thunks';
import {
  addTmpNewNode,
  collapseNode,
  expandNode,
  updateNodeState,
  setSelectedNode,
  deleteNodeFromState,
} from '../../nodesSlice';

export default function useNodeTreeEvents(id) {
  const dispatch = useDispatch();

  const persistentId = useSelector((state) => state.nodes.byId[id].persistentId);
  const isRoot = useSelector((state) => state.nodes.byId[id].isRoot);
  const isTemp = useSelector((state) => state.nodes.byId[id].isTemp);
  const isCurrent = useSelector((state) => state.nodes.byId[id].isCurrent);
  const isEditing = useSelector((state) => state.nodes.byId[id].isEditing);
  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[id]);

  const title = useSelector((state) => state.nodes.byId[id]?.title);
  const prevTitle = usePrevProps(title);

  const parentId = useSelector((state) => state.nodes.byId[id].parent_id);
  const persistentParentId = useSelector((state) => state.nodes.byId[parentId]?.persistentId);

  const navigate = useNavigate();

  //--------------------------------------------------------------------------------------------------------------------
  const onNodeClick = () => {
    if (isEditing) return;
    if (isExpanded && isCurrent) {
      dispatch(collapseNode({ id }));
      dispatch(setSelectedNode({ id: null }));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setSelectedNode({ id }));
    }
  };

  const addNodeLastClick = useRef(null);
  //--------------------------------------------------------------------------------------------------------------------
  const addChildNode = async () => {
    // prevent clicking too fast with delta
    const delta = 150;
    const now = Date.now();

    if (now - addNodeLastClick.current < delta) return;

    addNodeLastClick.current = now;

    // if (isTemp) return;

    if (!persistentId) {
      const message = title ? `Node "${title}" not initialized yet. Please wait...`
        : 'Current node not initialized yet. Please add title to current node in order to create child node.';

      dispatch(setAlert({
        isOpen: true,
        severity: 'error',
        message,
      }));
      return;
    }

    dispatch(addTmpNewNode({ parent_id: id }));
  };

  const editNode = () => dispatch(updateNodeState({ id, isEditing: true }));

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null);

  const saveNode = useCallback(() => {
    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

    saveNodeTimeout.current = setTimeout(() => {
      if (!title || title === prevTitle) return;

      if (isTemp) {
        dispatch(createNode({
          tempId: id,
          title,
          parent_id: persistentParentId,
        }));
      } else {
        dispatch(updateNode({
          id: persistentId,
          title,
        }));
      }
    }, 1000);
  }, [dispatch, id, isTemp, persistentId, persistentParentId, prevTitle, title]);

  const handleNodeTitleChange = (event) => {
    dispatch(updateNodeState({
      id,
      title: event.currentTarget.value,
    }));
  };

  const handleNodeBlur = () => {
    dispatch(updateNodeState({
      id,
      isEditing: false,
    }));
  };

  const removeNode = () => {
    if (isTemp) {
      dispatch(deleteNodeFromState({ id }));
    } else {
      dispatch(deleteNode(id));
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
