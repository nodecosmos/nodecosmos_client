import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNode } from '../nodes.selectors';
import { deleteNode } from '../nodes.thunks';
import { deleteNodeFromState } from '../nodesSlice';

export default function useNodeRemover(nodeId) {
  const dispatch = useDispatch();
  const { rootId, isTemp } = useSelector(selectNode(nodeId));
  const navigate = useNavigate();

  const removeNode = () => {
    if (isTemp) {
      dispatch(deleteNodeFromState({ nodeId }));
    } else {
      dispatch(deleteNode({ nodeId, rootId }));
    }
    if (rootId === nodeId) navigate('/nodes');
  };

  return { removeNode };
}
