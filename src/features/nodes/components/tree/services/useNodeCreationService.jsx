import { useDispatch, useSelector } from 'react-redux';
import {
  createNode, prependNewNode, NEW_NODE_ID, terminateNewNode, deleteNode,
} from '../../../nodeSlice';

export default function useNodeCreationService(props) {
  const { parentId } = props;
  const dispatch = useDispatch();

  const isNewNodePresent = useSelector((state) => state.nodes[NEW_NODE_ID]);

  const onNodeAdd = async () => {
    if (isNewNodePresent) {
      await dispatch(terminateNewNode());
    }
    dispatch(prependNewNode({ parent_id: parentId }));
  };

  let handleChangeTimeout;

  const handleNodeCreation = (event) => {
    if (handleChangeTimeout) clearTimeout(handleChangeTimeout);

    handleChangeTimeout = setTimeout(async () => {
      const title = event.target.innerText;

      if (!title) return;

      await dispatch(createNode({ title, parent_id: parentId }));
    }, 1000);
  };

  const onNodeDelete = (id) => {
    dispatch(deleteNode(id));
  };

  return {
    onNodeAdd,
    handleNodeCreation,
    onNodeDelete,
  };
}
