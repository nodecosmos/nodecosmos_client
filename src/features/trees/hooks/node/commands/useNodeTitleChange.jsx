import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../../../../common/hooks/usePrevious';
import { SAVE_NODE_TIMEOUT } from '../../../trees.constants';
import { selectNodeAttribute } from '../../../../nodes/nodes.selectors';
import { createNode, updateNodeTitle } from '../../../../nodes/nodes.thunks';
import {
  replaceTmpNodeWithPersistedNode,
  setIsNodeActionInProgress,
  updateNodeState,
} from '../../../../nodes/nodesSlice';
import { replaceTmpTreeNodeWithPersistedNode, updateTreeNode } from '../../../treesSlice';
import useNodeContext from '../useNodeContext';
import useHandle404Alert from '../../../../../common/hooks/useHandle404Alert';

export default function useNodeTitleChange() {
  const dispatch = useDispatch();
  const {
    nodeId,
    treeNodeId,
    treeRootNodeId,
    parentId,
    rootId,
    title,
  } = useNodeContext();

  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));
  const order = useSelector(selectNodeAttribute(nodeId, 'order'));
  const prevTitle = usePrevious(title);
  const handle404 = useHandle404Alert();
  const [shouldReplaceTmpNode, setShouldReplaceTmpNode] = useState(false);

  //--------------------------------------------------------------------------------------------------------------------
  const saveNodeTimeout = useRef(null);

  const changeTitle = useCallback((value) => {
    dispatch(setIsNodeActionInProgress(true));

    dispatch(updateNodeState({ id: nodeId, title: value }));
    persistentId && dispatch(updateNodeState({ id: persistentId, title: value }));

    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);
    if (!value || value === prevTitle) return;

    saveNodeTimeout.current = setTimeout(() => {
      if (persistentId) {
        dispatch(updateNodeTitle({ id: persistentId, title: value })).then((response, args) => {
          if (response.error) handle404(response.error);
          dispatch(setIsNodeActionInProgress(false));
        }).catch((error) => {
          console.log(error);
          dispatch(setIsNodeActionInProgress(false));
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
          dispatch(setIsNodeActionInProgress(false));
        }).catch((error) => {
          console.log(error);
          dispatch(setIsNodeActionInProgress(false));
        });
      }
    }, SAVE_NODE_TIMEOUT);
  }, [dispatch, handle404, nodeId, order, parentId, persistentId, prevTitle, rootId]);

  //--------------------------------------------------------------------------------------------------------------------
  const blurNode = useCallback(() => {
    dispatch(updateTreeNode({ treeNodeId, isEditing: false }));

    const shouldReplace = !!title; // if title is empty, we don't have to replace tmp node with persisted node
    setShouldReplaceTmpNode(shouldReplace);
  }, [dispatch, title, treeNodeId]);

  useEffect(() => {
    if (shouldReplaceTmpNode && isTemp && persistentId) {
      dispatch(replaceTmpNodeWithPersistedNode({ tmpNodeId: nodeId, persistentId }));
      dispatch(replaceTmpTreeNodeWithPersistedNode({
        tmpTreeNodeId: treeNodeId, treeRootNodeId, tmpNodeId: nodeId, persistentId,
      }));
    }
  }, [dispatch, shouldReplaceTmpNode, isTemp, nodeId, persistentId, treeRootNodeId, treeNodeId]);

  return { changeTitle, blurNode };
}
