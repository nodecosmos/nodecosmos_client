import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usePrevProps from '../../../common/hooks/usePrevProps';
import { createNode, deleteNode, updateNode } from '../../nodes.thunks';
import {
  addTmpNewNode,
  collapseNode,
  expandNode,
  updateNodeState,
  setSelectedNode,
  deleteNodeFromState,
} from '../../nodesSlice';

export default function useNodeTreeEvents(provisionalId) {
  const dispatch = useDispatch();

  const id = useSelector((state) => (state.nodes.byId[provisionalId].id));
  const isRoot = useSelector((state) => state.nodes.byId[provisionalId].isRoot);
  const isTemp = useSelector((state) => state.nodes.byId[provisionalId].isTemp);
  const isCurrent = useSelector((state) => state.nodes.byId[provisionalId].isCurrent);
  const isEditing = useSelector((state) => state.nodes.byId[provisionalId].isEditing);
  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[provisionalId]);

  const title = useSelector((state) => state.nodes.byId[provisionalId]?.title);
  const prevTitle = usePrevProps(title);

  const parentId = useSelector((state) => state.nodes.byId[provisionalId] && state.nodes.byId[provisionalId].parent_id);

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
          parent_id: parentId,
        }));
      } else {
        dispatch(updateNode({
          id,
          title,
        }));
      }
    }, 1000);
  }, [title, prevTitle, isTemp, dispatch, parentId, id]);

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
    if (isRoot) navigate('/');
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
