import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode } from '../../../app/appSlice';
import {
  collapseNode,
  createNode, deleteNode,
  deprecateNodesFetchedState,
  expandNode, NEW_NODE_ID,
  prependNewNode,
  terminateNewNode,
} from '../../nodeSlice';

export default function useNodeTreeEvents(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const nodeExpanded = useSelector((state) => state.nodes[id] && state.nodes[id].expanded);
  const isNewNodePresent = useSelector((state) => state.nodes[NEW_NODE_ID]);

  const currentNodeId = useSelector((state) => state.app.currentNodeID);
  const isCurrentNode = currentNodeId === id;

  const onNodeClick = () => {
    if (nodeExpanded && isCurrentNode) {
      dispatch(collapseNode({ id }));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode(id));
    }
  };

  const onNodeAdd = async () => {
    if (isNewNodePresent) {
      await dispatch(terminateNewNode());
    }
    dispatch(prependNewNode({ parent_id: id }));
  };

  let handleChangeTimeout;

  const handleNodeCreation = (event) => {
    if (handleChangeTimeout) clearTimeout(handleChangeTimeout);

    handleChangeTimeout = setTimeout(async () => {
      const title = event.target.innerText;

      if (!title) return;

      await dispatch(createNode({ title, parent_id: id }));
      setTimeout(() => dispatch(deprecateNodesFetchedState()), 500);
    }, 1000);
  };

  const handleNodeDeletion = (nodeId) => {
    dispatch(deleteNode(nodeId));
  };

  return {
    onNodeClick,
    onNodeAdd,
    handleNodeCreation,
    handleNodeDeletion,
  };
}
