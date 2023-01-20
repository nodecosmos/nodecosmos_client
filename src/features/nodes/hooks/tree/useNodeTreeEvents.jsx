import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../../../history';
import { setCurrentNode } from '../../../app/appSlice';
import usePrevProps from '../../../app/hooks/usePrevProps';
import {
  addNewNode,
  collapseNode,
  createNode,
  deleteNode,
  expandNode,
  updateNode,
  updateNodeState,
} from '../../nodeSlice';

export default function useNodeTreeEvents(id) {
  const dispatch = useDispatch();

  const isRoot = useSelector((state) => state.nodes[id] && state.nodes[id].is_root);
  const isNew = useSelector((state) => state.nodes[id] && state.nodes[id].isNew);
  const isExpanded = useSelector((state) => state.nodes[id] && state.nodes[id].isExpanded);

  const title = useSelector((state) => state.nodes[id] && state.nodes[id].title);
  const prevTitle = usePrevProps(title);

  const parentId = useSelector((state) => state.nodes[id] && state.nodes[id].parent_id);

  const currentNodeId = useSelector((state) => state.app.currentNodeID);
  const isCurrentNode = currentNodeId === id;

  //--------------------------------------------------------------------------------------------------------------------
  const onNodeClick = () => {
    if (isExpanded && isCurrentNode) {
      dispatch(collapseNode({ id }));
      dispatch(setCurrentNode(null));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode(id));
    }
  };

  //--------------------------------------------------------------------------------------------------------------------
  const addNode = async () => {
    dispatch(addNewNode({ parent_id: id, isNew: true }));
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

      if (isNew) {
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
    }, 500);
  }, [title, prevTitle, isNew, dispatch, parentId, id]);

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
      isJustCreated: false,
    }));
  };

  const removeNode = (nodeId) => {
    dispatch(deleteNode(nodeId));
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
