import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode } from '../../../app/appSlice';
import {
  collapseNode,
  deleteNodeFromState,
  expandNode, NEW_NODE_ID,
  prependNewNode,
  terminateNewNode,
} from '../../components/landing-page-tree/landingPageNodeSlice';
import history from '../../../../history';

const ROOT_LANDING_PAGE_NODE_ID = '635a91ea690cc413ead79ce2';

export default function useNodeTreeEvents(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const nodeExpanded = useSelector((state) => state.landingPageNodes[id] && state.landingPageNodes[id].expanded);
  const isNewNodePresent = useSelector((state) => state.landingPageNodes[NEW_NODE_ID]);
  const isRoot = useSelector((state) => state.landingPageNodes[id] && state.landingPageNodes[id].is_root);
  const isEditing = useSelector((state) => state.landingPageNodes[id] && state.landingPageNodes[id].isEditing);

  const currentNodeId = useSelector((state) => state.app.currentNodeID);
  const isCurrentNode = currentNodeId === id;

  const onNodeClick = (event) => {
    if (nodeExpanded && isCurrentNode) {
      if (isEditing) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      dispatch(collapseNode({ id }));
      dispatch(setCurrentNode(null));
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

  const handleNodeCreation = (event) => {
    const title = event.target.innerText;
    prependNewNode({ title, parent_id: id });
  };

  const handleNodeDeletion = (nodeId) => {
    if (nodeId === ROOT_LANDING_PAGE_NODE_ID) return;

    dispatch(deleteNodeFromState({ id: nodeId }));
    if (isRoot) history.push('/');
  };

  return {
    onNodeClick,
    onNodeAdd,
    handleNodeCreation,
    handleNodeDeletion,
  };
}
