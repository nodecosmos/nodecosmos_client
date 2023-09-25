import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../../common/hooks/usePrevious';
import { SAVE_NODE_TIMEOUT } from '../../trees/trees.constants';
import { selectNodeAttribute } from '../nodes.selectors';
import { createNode, updateNodeTitle } from '../nodes.thunks';
import { replaceTmpNodeWithPersistedNode, setNodeCreationInProgress, updateNodeState } from '../nodesSlice';
import { setAlert } from '../../app/appSlice';

export default function useNodeTitleChangeHandler({ nodeId }) {
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
    dispatch(setNodeCreationInProgress(true));

    dispatch(updateNodeState({ id: nodeId, title: value }));
    persistentId && dispatch(updateNodeState({ id: persistentId, title: value }));

    if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);
    if (!value || value === prevTitle) return;

    saveNodeTimeout.current = setTimeout(() => {
      if (persistentId) {
        const data = { rootId, id: persistentId, title: value };

        dispatch(updateNodeTitle(data)).then((response, args) => {
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
    if (shouldReplaceTmpNode && isTemp && persistentId) {
      dispatch(replaceTmpNodeWithPersistedNode({ tmpNodeId: nodeId, persistentId }));
    }
  }, [dispatch, shouldReplaceTmpNode, isTemp, nodeId, persistentId]);

  return { handleNodeTitleChange, handleTitleChangeFinish };
}
