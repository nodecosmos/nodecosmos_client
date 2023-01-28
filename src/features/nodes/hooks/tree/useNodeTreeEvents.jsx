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
  setCurrentNode, deleteNodeFromState,
} from '../../nodeSlice';

export default function useNodeTreeEvents(id) {
  const dispatch = useDispatch();

  const isRoot = useSelector((state) => state.nodes.byId[id].isRoot);
  const isTemp = useSelector((state) => state.nodes.byId[id].isTemp);
  const isCurrentNode = useSelector((state) => state.nodes.byId[id].isCurrent);
  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[id]);

  const title = useSelector((state) => state.nodes.byId[id]?.title);
  const prevTitle = usePrevProps(title);

  const parentId = useSelector((state) => state.nodes.byId[id] && state.nodes.byId[id].parent_id);

  //--------------------------------------------------------------------------------------------------------------------
  const onNodeClick = () => {
    if (isExpanded && isCurrentNode) {
      dispatch(collapseNode({ id }));
      dispatch(setCurrentNode(id));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode({ id }));
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  const addNode = async () => {
    dispatch(addNewNode({ parent_id: id, isTemp: true }));
  };

  const editNode = () => dispatch(updateNodeState({
    id,
    isEditing: true,
  }));

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
