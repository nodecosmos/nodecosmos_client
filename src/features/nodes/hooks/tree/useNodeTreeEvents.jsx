import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../../../history';
import usePrevProps from '../../../app/hooks/usePrevProps';
import {
  addNewNode,
  collapseNode,
  createNode,
  deleteNode,
  expandNode,
  updateNode,
  updateNodeState,
  setCurrentNode,
  deleteNodeFromState,
  deprecateReplaceTempNodeStatus,
} from '../../nodeSlice';

export default function useNodeTreeEvents(id) {
  const dispatch = useDispatch();

  const isRoot = useSelector((state) => state.nodes.byId[id].isRoot);
  const isTemp = useSelector((state) => state.nodes.byId[id].isTemp);
  const isCurrent = useSelector((state) => state.nodes.byId[id].isCurrent);
  const isEditing = useSelector((state) => state.nodes.byId[id].isEditing);
  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[id]);

  const title = useSelector((state) => state.nodes.byId[id]?.title);
  const prevTitle = usePrevProps(title);

  const parentId = useSelector((state) => state.nodes.byId[id] && state.nodes.byId[id].parent_id);

  //--------------------------------------------------------------------------------------------------------------------
  const onNodeClick = () => {
    if (isEditing) return;

    if (isExpanded && isCurrent) {
      dispatch(collapseNode({ id }));
      dispatch(setCurrentNode({ id: null }));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode({ id }));
    }
  };

  const addNodeLastClick = useRef(null);
  //--------------------------------------------------------------------------------------------------------------------
  const addNode = async () => {
    // prevent clicking too fast with delta
    const delta = 150;
    const now = Date.now();

    if (now - addNodeLastClick.current < delta) return;

    addNodeLastClick.current = now;

    // if (isTemp) return;

    dispatch(addNewNode({ parent_id: id, isTemp: true }));
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
        setTimeout(() => dispatch(deprecateReplaceTempNodeStatus({ id })), 500);
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
      isReplacingTempNode: false,
    }));
  };

  const removeNode = () => {
    if (isTemp) {
      dispatch(deleteNodeFromState({ id }));
    } else {
      dispatch(deleteNode(id));
    }
    if (isRoot) history.push('/');
  };

  //--------------------------------------------------------------------------------------------------------------------
  return {
    onNodeClick,
    addNode,
    editNode,
    removeNode,
    saveNode,
    handleNodeTitleChange,
    handleNodeBlur,
  };
}
