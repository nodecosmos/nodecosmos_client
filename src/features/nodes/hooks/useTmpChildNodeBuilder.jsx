import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../app/appSlice';
import { setCurrentTempNodeId } from '../../trees/treesSlice';
import { selectNode, selectNodeCreationInProgress } from '../nodes.selectors';
import { buildChildNode } from '../nodesSlice';

export default function useTmpChildNodeBuilder(nodeId) {
  const {
    title,
    isTemp,
  } = useSelector(selectNode(nodeId));

  const dispatch = useDispatch();
  const nodeCreationInProgress = useSelector(selectNodeCreationInProgress);
  const [loading, setLoading] = useState(false);

  const initTempChildNode = useCallback(() => {
    const tmpNodeId = `tmp_${Date.now()}`;

    dispatch(setAlert({
      isOpen: false,
    }));
    dispatch(setCurrentTempNodeId(tmpNodeId));
    dispatch(buildChildNode({ tmpNodeId, nodeId }));
  }, [dispatch, nodeId]);

  //--------------------------------------------------------------------------------------------------------------------
  const addChildNode = async () => {
    if (nodeCreationInProgress) {
      setLoading(true);
      const message = `Too Fast! Please wait until current node is saved before creating new node. 
      If this problem persists, please contact us.`;

      // dispatch(setAlert({
      //   isOpen: true, severity: 'warning', message, anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      // }));

      console.error(message);
    } else if (isTemp) {
      const message = title ? `Node "${title}" not initialized yet. Please wait...`
        : 'Current node not initialized yet. '
        + 'Please add title to current node in order to create child node.';

      dispatch(setAlert({
        isOpen: true, severity: 'error', message, anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      }));
    } else {
      initTempChildNode();
    }
  };

  useEffect(() => {
    if (loading && !nodeCreationInProgress) {
      setLoading(false);
      initTempChildNode();
    }
  }, [initTempChildNode, loading, nodeCreationInProgress]);

  return { addChildNode, loading };
}
