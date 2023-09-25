import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../../common/hooks/usePrevious';
import { SAVE_NODE_TIMEOUT } from '../../trees/trees.constants';
import { selectNodeAttribute } from '../nodes.selectors';
import { createNode, updateNodeTitle } from '../nodes.thunks';
import { replaceTmpNodeWithPersistedNode, updateNodeState } from '../nodesSlice';
import { selectTreeNodeAttribute } from '../../trees/trees.selectors';

export default function useNodeTitleChangeHandler({ nodeId, treeNodeId }) {
  const dispatch = useDispatch();
  const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const rootId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));
  const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));
  const prevTitle = usePrevious(title);

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null);

  const handleNodeTitleChange = (value) => {
    dispatch(updateNodeState({ id: nodeId, title: value }));
    persistentId && dispatch(updateNodeState({ id: persistentId, title: value }));

    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);
    if (!value || value === prevTitle) return;

    saveNodeTimeout.current = setTimeout(() => {
      if (persistentId) {
        dispatch(updateNodeTitle({ rootId, id: persistentId, title: value }));
      } else {
        dispatch(createNode({
          rootId,
          parentId,
          title: value,
          tmpNodeId: nodeId,
        }));
      }
    }, SAVE_NODE_TIMEOUT);
  };

  const [shouldReplaceTmpNode, setShouldReplaceTmpNode] = useState(false);

  const handleTitleChangeFinish = () => {
    setShouldReplaceTmpNode(true);
  };

  useEffect(() => {
    if (shouldReplaceTmpNode && isTemp && persistentId) {
      dispatch(replaceTmpNodeWithPersistedNode({ tmpNodeId: nodeId, persistentId }));
    }
  }, [dispatch, shouldReplaceTmpNode, isTemp, nodeId, persistentId]);

  return { handleNodeTitleChange, handleTitleChangeFinish };
}
