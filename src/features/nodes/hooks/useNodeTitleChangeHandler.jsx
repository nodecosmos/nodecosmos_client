import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../../common/hooks/usePrevious';
import { SAVE_NODE_TIMEOUT } from '../../trees/trees.constants';
import { selectNodeAttribute } from '../nodes.selectors';
import { createNode, updateNodeTitle } from '../nodes.thunks';
import { replaceTmpNodeWithPersistedNode, setNodeCreationInProgress, updateNodeState } from '../nodesSlice';
import { setAlert } from '../../app/appSlice';
import { expandTreeNode } from '../../trees/treesSlice';
import { replaceNodeIdInTreeNodeId } from '../../trees/trees.memoize';
import useNodeContext from '../../trees/hooks/useNodeContext';

export default function useNodeTitleChangeHandler() {
  const dispatch = useDispatch();
  const {
    nodeId,
    treeNodeId,
    parentId,
    rootId,
    title,
    isExpanded,
  } = useNodeContext();

  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));
  const order = useSelector(selectNodeAttribute(nodeId, 'order'));

  const prevTitle = usePrevious(title);

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null);

  const handleNodeTitleChange = (value) => {
    dispatch(setNodeCreationInProgress(true));

    dispatch(updateNodeState({ id: nodeId, title: value }));
    persistentId && dispatch(updateNodeState({ id: persistentId, title: value }));

    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);
    if (!value || value === prevTitle) return;

    saveNodeTimeout.current = setTimeout(() => {
      if (persistentId) {
        dispatch(updateNodeTitle({ id: persistentId, title: value })).then((response, args) => {
          if (response.error) handle404(response.error);
          dispatch(setNodeCreationInProgress(false));
        }).catch((error) => {
          console.log(error);
          dispatch(setNodeCreationInProgress(false));
        });
      } else {
        const data = {
          rootId,
          parentId,
          title: value,
          order,
          tmpNodeId: nodeId,
        };

        dispatch(createNode(data)).then((response, args) => {
          if (response.error) handle404(response.error);
          dispatch(setNodeCreationInProgress(false));
        }).catch((error) => {
          console.log(error);
          dispatch(setNodeCreationInProgress(false));
        });
      }
    }, SAVE_NODE_TIMEOUT);
  };

  const handle404 = (error) => {
    if (error.message.includes('404')) {
      dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Node not found.' }));
    }
  };

  const [shouldReplaceTmpNode, setShouldReplaceTmpNode] = useState(false);

  const handleTitleChangeFinish = () => {
    const shouldReplace = !!title; // if title is empty, we don't have to replace tmp node with persisted node
    setShouldReplaceTmpNode(shouldReplace);
  };

  useEffect(() => {
    async function replaceTmpNode() {
      await dispatch(replaceTmpNodeWithPersistedNode({ tmpNodeId: nodeId, persistentId }));
      if (isExpanded) {
        const newTreeNodeId = replaceNodeIdInTreeNodeId(treeNodeId, persistentId);
        dispatch(expandTreeNode(newTreeNodeId));
      }
    }

    if (shouldReplaceTmpNode && isTemp && persistentId) {
      replaceTmpNode().catch((error) => console.error(error));
    }
  }, [dispatch, shouldReplaceTmpNode, isTemp, nodeId, persistentId, isExpanded, treeNodeId]);

  return { handleNodeTitleChange, handleTitleChangeFinish };
}
