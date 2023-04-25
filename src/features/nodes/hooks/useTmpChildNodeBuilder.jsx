import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../app/appSlice';
import { setCurrentTempNodeId } from '../../trees/treesSlice';
import { selectNode } from '../nodes.selectors';
import { buildChildNode } from '../nodesSlice';

export default function useTmpChildNodeBuilder(nodeId) {
  const {
    persistentId,
    persistentRootId,
    title,
    isTemp,
  } = useSelector(selectNode(nodeId));

  const dispatch = useDispatch();

  //--------------------------------------------------------------------------------------------------------------------
  const addChildNodeLastClick = useRef(null);

  const addChildNode = async () => {
    // prevent clicking too fast
    const delta = 150;
    const now = Date.now();

    if (now - addChildNodeLastClick.current < delta) return;

    addChildNodeLastClick.current = now;

    if (isTemp) {
      const message = title ? `Node "${title}" not initialized yet. Please wait...`
        : 'Current node not initialized yet. '
        + 'Please add title to current node in order to create child node.';

      dispatch(setAlert({ isOpen: true, severity: 'error', message }));
    } else {
      const tmpNodeId = `tmp_${Date.now()}`;

      dispatch(setCurrentTempNodeId(tmpNodeId));
      dispatch(buildChildNode({
        tmpNodeId, nodeId, persistentId, persistentRootId,
      }));
    }
  };

  return { addChildNode };
}
