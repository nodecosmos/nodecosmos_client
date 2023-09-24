import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../../common/hooks/usePrevious';
import { SAVE_NODE_TIMEOUT } from '../../trees/trees.constants';
import { selectNode } from '../nodes.selectors';
import { createNode, updateNodeTitle } from '../nodes.thunks';
import { updateNodeState } from '../nodesSlice';

export default function useNodeTitleChangeHandler(nodeId) {
  const dispatch = useDispatch();

  const {
    parentId,
    persistentId,
    persistentParentId,
    persistentRootId,
    title,
    isTemp,
  } = useSelector(selectNode(nodeId));

  const prevTitle = usePrevious(title);

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null);

  useEffect(() => {
    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);
    if (!title || title === prevTitle) return;

    saveNodeTimeout.current = setTimeout(() => {
      if (isTemp) {
        dispatch(createNode({
          title,
          persistentRootId,
          persistentParentId,
          parentId,
          tmpNodeId: nodeId,
        }));
      } else {
        dispatch(updateNodeTitle({ persistentId, persistentRootId, title }));
      }
    }, SAVE_NODE_TIMEOUT);
  }, [dispatch, isTemp, persistentRootId, nodeId, parentId, persistentId, persistentParentId, prevTitle, title]);

  const handleNodeTitleChange = (event) => {
    dispatch(updateNodeState({ id: nodeId, title: event.currentTarget.value }));
    dispatch(updateNodeState({ id: persistentId, title: event.currentTarget.value }));
  };

  return { handleNodeTitleChange };
}
